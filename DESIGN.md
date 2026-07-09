---
name: SubCodeCo Professional
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#40484d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#70787e'
  outline-variant: '#bfc8ce'
  surface-tint: '#0e6588'
  primary: '#004f6c'
  on-primary: '#ffffff'
  primary-container: '#14688b'
  on-primary-container: '#b6e3ff'
  inverse-primary: '#8acff6'
  secondary: '#316384'
  on-secondary: '#ffffff'
  secondary-container: '#a7d7fd'
  on-secondary-container: '#2b5e7f'
  tertiary: '#6d3e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#8a5515'
  on-tertiary-container: '#ffd5af'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#8acff6'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#9cccf1'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#124b6b'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#feb870'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  deep-navy: '#104C66'
  teal-accent: '#14688B'
  pure-black: '#000000'
  pure-white: '#FFFFFF'
  border-gray: '#E2E8F0'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
  button-text:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max-width: 1280px
  section-padding-v: 80px
  gutter: 24px
  base-unit: 8px
---

## Brand & Style

The brand identity for the design system is anchored in trust, technical precision, and modern enterprise professionalism. It targets a corporate and B2B audience, emphasizing reliability and structured innovation. 

The visual style follows a **Corporate / Modern** aesthetic. It utilizes a deep, sophisticated navy base paired with vibrant teal accents to create a high-contrast yet professional atmosphere. The interface is characterized by clean lines, ample whitespace, and a rhythmic use of cards to organize complex information. It is designed to be highly functional, with a focus on legibility and clear calls to action, ensuring the user feels a sense of stability and technological competence throughout the journey.

## Colors

The palette is dominated by the **Primary Teal (#14688B)** and **Secondary Navy (#004261)**. 

- **Primary Teal** is used for primary actions, success states, and key decorative accents.
- **Secondary Navy** provides depth and is primarily used for headers, text, and high-importance backgrounds.
- **Surface Colors:** Surfaces use a mixture of pure white and a very light neutral gray (#F8FAFC) to differentiate sections.
- **Neutrality:** The system avoids saturated grays, opting for cool-toned neutrals to maintain the professional, technological feel.

## Typography

The design system utilizes **Inter** for all typographic needs to ensure a clean, neutral, and highly legible appearance. 

- **Hierarchy:** Dramatic scale is used for display headings to create clear entry points. 
- **Localization:** While Inter is the primary typeface for Latin scripts, **Alexandria** or a similar geometric Sans-Serif must be used for Arabic localization to maintain the same modern, balanced aesthetic.
- **Weights:** Heavy weights (700) are reserved for display text, while Medium (500) and Semi-Bold (600) are used for interactive elements and sub-headers to provide weight without feeling aggressive.

## Layout & Spacing

This design system uses a **Fixed Grid** approach for desktop, centering content within a 1280px container.

- **Vertical Rhythm:** Sections are separated by generous vertical padding (80px to 120px) to allow the content to "breathe" and signal clear transitions between topics.
- **Grid:** A 12-column grid is standard for desktop, collapsing to 4 columns for mobile.
- **RTL Support:** The layout must be fully reversible for Arabic language support. Margins and icons (specifically arrows) must flip orientation, ensuring that progress-related imagery flows from right-to-left.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Ambient Shadows**.

- **Surfaces:** Main backgrounds are #FFFFFF, with secondary container areas using #F8FAFC.
- **Shadows:** Cards utilize a very soft, diffused shadow (0px 4px 20px rgba(0, 66, 97, 0.08)). This provides a sense of lift without appearing heavy or dated.
- **Outlines:** Subtle 1px borders in #E2E8F0 are used on cards to maintain definition on white backgrounds, especially when shadows are minimized.

## Shapes

The shape language is **Soft** and restrained. 

- **Standard Radius:** Components like input fields and small cards use a 4px (0.25rem) radius.
- **Container Radius:** Larger feature cards or modal containers may use up to 8px (0.5rem) to feel more approachable.
- **Geometric Rigidity:** Circles are used sparingly, primarily for icon backgrounds or status indicators, to maintain the professional, structured look.

## Components

### Buttons
- **Primary (Filled):** Background #14688B, White text. No border. High-contrast hover state (darker teal).
- **Secondary (Outlined):** Transparent background, #14688B border (1px), #14688B text.
- **Icon Buttons:** Outlined buttons often include a trailing arrow icon. In RTL layouts, this arrow must point left and be placed on the left side of the text.

### Cards
- White background with a 1px #E2E8F0 border and a soft ambient shadow.
- Inner padding should be consistent (typically 24px or 32px).
- Content within cards should be left-aligned (Right-aligned for RTL).

### Input Fields
- Subtle gray borders (#E2E8F0) that shift to #14688B on focus.
- 4px corner radius.
- Labels are positioned above the field using `label-lg` styles.

### Chips & Tags
- Small, low-contrast backgrounds (e.g., light teal tint) with #004261 text for categorization.
- Highly rounded (pill-shaped) to distinguish them from actionable buttons.