import { useLayoutEffect } from 'haunted';
import { supportsAdoptingStyleSheets, unsafeCSS } from 'lit-element';

export function useStyles(el: HTMLElement, style: string | string[]) {
  const styles = Array.isArray(style)
    ? style.map((s) => unsafeCSS(s))
    : [unsafeCSS(style)];

  /**
   * Applies styling to the element shadowRoot using the [[`styles`]]
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */
  const adoptStyles = (el: HTMLElement) => {
    if (styles.length === 0) {
      return;
    }

    const ShadyCSS = (window as any).ShadyCSS;

    // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after rendering
    if (ShadyCSS !== undefined && !ShadyCSS.nativeShadow) {
      ShadyCSS.ScopingShim.prepareAdoptedCssText(
        styles.map((s) => s.cssText),
        el.localName
      );
    } else if (supportsAdoptingStyleSheets) {
      (el.shadowRoot as any).adoptedStyleSheets = styles.map((s) =>
        s instanceof CSSStyleSheet ? s : s.styleSheet
      );
    } else {
      styles.forEach((s) => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        el.shadowRoot!.appendChild(style);
      });
    }
  };

  useLayoutEffect(() => {
    adoptStyles(el);
  }, [styles]);
}
