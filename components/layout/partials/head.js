import Head from 'next/head';

export default function HTMLHead({data}) {
    return (
      <Head>
        <title>Magenta Capital - Trading Monitor</title>
        <meta name="description" content="" />
        <link
          rel="shortcut icon"
          type="image/png"
          href="img/logo/favicon.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
    );
}