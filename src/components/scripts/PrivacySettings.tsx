import Script from "next/script";

const PrivacySetings = () => {
  return (
    <Script
      id="humanity"
      src="https://cdn.hu-manity.co/hu-banner.min.js"
      strategy="beforeInteractive"
    >
      {`
            var huOptions = {
                'appID': 'perebarcelopsicologocom-5e860ea',
                'currentLanguage': 'en',
                'blocking': true,
                'globalCookie': false
                }
                `}
    </Script>
  );
};

export default PrivacySetings;
