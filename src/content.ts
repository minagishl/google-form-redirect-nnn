function getEmail(): string | null {
  // Get all a elements
  const links = document.querySelectorAll(
    'a[href^="https://accounts.google.com/AccountChooser?continue="]'
  );

  for (const link of links) {
    // Cast link to HTMLAnchorElement to access href
    const parent = link.parentElement;
    if (parent) {
      const span = parent.querySelector("span");
      if (span && span.textContent !== null) {
        return span.textContent.trim();
      }
      // Log if no span found at the same level
      console.log(
        "No span found at the same level:",
        (link as HTMLAnchorElement).href
      );
      return null;
    }
  }
  return null;
}

const email = getEmail();
if (!email?.includes("@nnn.ed.jp")) {
  const linkElement = document.querySelector<HTMLAnchorElement>(
    'a[href^="https://accounts.google.com/AccountChooser?continue="]'
  );

  if (linkElement?.href) {
    const url = new URL(linkElement.href);
    url.searchParams.set("hd", "nnn.ed.jp");
    window.location.href = url.toString();
  }
}

if (document.body.textContent?.includes("権限が必要です")) {
  const currentUrl = window.location.href;
  // Remove /u/{number}/
  const cleanedUrl = currentUrl.replace(/\/u\/\d+\//, "/");
  const viewUrl = cleanedUrl.replace(
    /\/(edit|formrestricted|formResponse)(\?|$)/,
    "/viewform$2"
  );

  // Redirect to Google Account Chooser screen (specifying nnn.ed.jp with hd parameter)
  const chooserUrl = `https://accounts.google.com/AccountChooser?continue=${encodeURIComponent(viewUrl)}&hd=nnn.ed.jp`;
  window.location.href = chooserUrl;
}
