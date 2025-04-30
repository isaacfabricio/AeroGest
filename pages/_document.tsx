import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends React.Component {
  render() {
    const nonce = 'xyz123'; // Idealmente gerar nonce dinâmico para cada requisição

    return (
      <Html>
        <Head>
          {/* Content Security Policy */}
          <meta
            httpEquiv="Content-Security-Policy"
            content={\`
              default-src 'self';
              script-src 'self' 'nonce-\${nonce}';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data:;
              connect-src 'self' https://api.example.com https://seu-backend.com;
              frame-src 'none';
              object-src 'none';
            \`}
          />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}
