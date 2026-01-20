// Supabase Edge Function: scan-site
// Fetches a website and extracts brand information

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScanResult {
  success: boolean;
  data?: {
    businessName: string;
    tagline: string;
    industry: string;
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string | null;
    favicon: string | null;
    socialLinks: Record<string, string>;
    contactEmail: string | null;
    phone: string | null;
    address: string | null;
  };
  error?: string;
}

// Extract colours from CSS/inline styles
function extractColours(html: string): { primary: string; secondary: string } {
  const colours: string[] = [];
  
  // Match hex colours
  const hexMatches = html.match(/#[0-9A-Fa-f]{6}\b/g) || [];
  colours.push(...hexMatches);
  
  // Match rgb colours
  const rgbMatches = html.match(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi) || [];
  colours.push(...rgbMatches.map(rgb => {
    const nums = rgb.match(/\d+/g);
    if (nums && nums.length >= 3) {
      return '#' + nums.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
    }
    return null;
  }).filter(Boolean) as string[]);

  // Count frequency
  const frequency: Record<string, number> = {};
  colours.forEach(c => {
    const normalised = c.toLowerCase();
    // Skip black, white, greys
    if (['#000000', '#ffffff', '#fff', '#000', '#333333', '#666666', '#999999', '#cccccc'].includes(normalised)) return;
    frequency[normalised] = (frequency[normalised] || 0) + 1;
  });

  // Sort by frequency
  const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
  
  return {
    primary: sorted[0]?.[0] || '#6366f1',
    secondary: sorted[1]?.[0] || '#ec4899',
  };
}

// Extract meta content
function getMeta(html: string, name: string): string | null {
  // Try name attribute
  const nameMatch = html.match(new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i'));
  if (nameMatch) return nameMatch[1];
  
  // Try property attribute (for OG tags)
  const propMatch = html.match(new RegExp(`<meta[^>]*property=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i'));
  if (propMatch) return propMatch[1];
  
  // Try content first then name/property
  const reverseMatch = html.match(new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, 'i'));
  if (reverseMatch) return reverseMatch[1];
  
  return null;
}

// Extract title
function getTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : '';
}

// Extract logo URL
function getLogo(html: string, baseUrl: string): string | null {
  // Try OG image first
  const ogImage = getMeta(html, 'og:image');
  if (ogImage) return resolveUrl(ogImage, baseUrl);
  
  // Try to find logo in img tags
  const logoMatch = html.match(/<img[^>]*(?:class|id|alt)=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']*)["']/i);
  if (logoMatch) return resolveUrl(logoMatch[1], baseUrl);
  
  // Try src first
  const logoMatch2 = html.match(/<img[^>]*src=["']([^"']*)["'][^>]*(?:class|id|alt)=["'][^"']*logo[^"']*["']/i);
  if (logoMatch2) return resolveUrl(logoMatch2[1], baseUrl);
  
  return null;
}

// Extract favicon
function getFavicon(html: string, baseUrl: string): string | null {
  const match = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']*)["']/i);
  if (match) return resolveUrl(match[1], baseUrl);
  
  const match2 = html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["'](?:icon|shortcut icon)["']/i);
  if (match2) return resolveUrl(match2[1], baseUrl);
  
  // Default to /favicon.ico
  return baseUrl + '/favicon.ico';
}

// Extract social links
function getSocialLinks(html: string): Record<string, string> {
  const links: Record<string, string> = {};
  const patterns: Record<string, RegExp> = {
    facebook: /href=["'](https?:\/\/(?:www\.)?facebook\.com\/[^"'\s]+)["']/gi,
    twitter: /href=["'](https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[^"'\s]+)["']/gi,
    instagram: /href=["'](https?:\/\/(?:www\.)?instagram\.com\/[^"'\s]+)["']/gi,
    linkedin: /href=["'](https?:\/\/(?:www\.)?linkedin\.com\/[^"'\s]+)["']/gi,
    youtube: /href=["'](https?:\/\/(?:www\.)?youtube\.com\/[^"'\s]+)["']/gi,
  };
  
  for (const [platform, pattern] of Object.entries(patterns)) {
    const match = pattern.exec(html);
    if (match) links[platform] = match[1];
  }
  
  return links;
}

// Extract email
function getEmail(html: string): string | null {
  const match = html.match(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  return match ? match[1] : null;
}

// Extract phone
function getPhone(html: string): string | null {
  const match = html.match(/tel:([+\d\s()-]+)/i);
  return match ? match[1].trim() : null;
}

// Resolve relative URLs
function resolveUrl(url: string, baseUrl: string): string {
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return baseUrl + url;
  return baseUrl + '/' + url;
}

// Guess industry from content
function guessIndustry(html: string, title: string): string {
  const text = (html + ' ' + title).toLowerCase();
  
  const industries: Record<string, string[]> = {
    'technology-software': ['software', 'tech', 'app', 'saas', 'cloud', 'digital', 'api', 'platform'],
    'e-commerce-retail': ['shop', 'store', 'buy', 'cart', 'product', 'retail', 'ecommerce'],
    'health-wellness': ['health', 'wellness', 'fitness', 'medical', 'clinic', 'therapy', 'doctor'],
    'professional-services': ['consulting', 'lawyer', 'accountant', 'legal', 'advisory', 'agency'],
    'food-hospitality': ['restaurant', 'food', 'cafe', 'hotel', 'catering', 'dining', 'menu'],
    'construction-trades': ['construction', 'builder', 'plumber', 'electrician', 'contractor', 'roofing'],
    'creative-design': ['design', 'creative', 'studio', 'photography', 'art', 'media', 'video'],
    'education-training': ['education', 'school', 'training', 'course', 'learn', 'academy', 'university'],
  };
  
  for (const [industry, keywords] of Object.entries(industries)) {
    if (keywords.some(k => text.includes(k))) {
      return industry;
    }
  }
  
  return 'professional-services';
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalise URL
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http')) {
      targetUrl = 'https://' + targetUrl;
    }

    // Extract base URL
    const urlObj = new URL(targetUrl);
    const baseUrl = urlObj.origin;

    // Fetch the page
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; UXMasterChief/1.0; +https://uxmasterchief.com)',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ success: false, error: `Failed to fetch: ${response.status}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text();

    // Extract everything
    const title = getTitle(html);
    const description = getMeta(html, 'description') || getMeta(html, 'og:description') || '';
    const colours = extractColours(html);
    
    // Clean up business name from title
    let businessName = title;
    // Remove common suffixes
    businessName = businessName.replace(/\s*[-|–—]\s*.+$/, '').trim();
    businessName = businessName.replace(/\s*\|.+$/, '').trim();

    const result: ScanResult = {
      success: true,
      data: {
        businessName,
        tagline: description.slice(0, 150),
        industry: guessIndustry(html, title),
        primaryColor: colours.primary,
        secondaryColor: colours.secondary,
        logoUrl: getLogo(html, baseUrl),
        favicon: getFavicon(html, baseUrl),
        socialLinks: getSocialLinks(html),
        contactEmail: getEmail(html),
        phone: getPhone(html),
        address: null, // Would need more complex extraction
      },
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
