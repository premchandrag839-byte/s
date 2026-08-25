import Head from "next/head";

export default function SEO({
  title = "AKASH INTER COLLEGE",
  description = "AKASH INTER COLLEGE - HUSAINGANJ, FATEHPUR 212651 (U.P.). Admissions open.",
  url = "https://www.akashintercollege.in",
  image = "/assets/logo.png",
}) {
  const fullTitle = title ? `${title} | AKASH INTER COLLEGE` : "AKASH INTER COLLEGE";
  const base = String(url || '').replace(/\/$/, "");
  const imgPath = String(image || '').startsWith('http')
    ? image
    : `${base}${image?.startsWith('/') ? '' : '/'}${image || ''}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={base || 'https://www.akashintercollege.in'} />

      <meta property="og:site_name" content="AKASH INTER COLLEGE" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={base || 'https://www.akashintercollege.in'} />
      {image && <meta property="og:image" content={imgPath} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={imgPath} />}
    </Head>
  );
}
