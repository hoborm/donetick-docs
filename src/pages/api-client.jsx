import React from 'react';
import Layout from '@theme/Layout';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import '../css/swagger-theme.css'; // Add this
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function ApiClient() {
  const isBrowser = useIsBrowser();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  React.useEffect(() => {
    if (isBrowser) {
      // Detect initial theme
      const htmlElement = document.documentElement;
      setIsDarkTheme(htmlElement.getAttribute('data-theme') === 'dark');

      // Watch for theme changes
      const observer = new MutationObserver(() => {
        setIsDarkTheme(htmlElement.getAttribute('data-theme') === 'dark');
      });

      observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      return () => observer.disconnect();
    }
  }, [isBrowser]);

  return (
    <Layout
      title="API Client"
      description="Interactive API documentation">
      <div 
        className={isDarkTheme ? 'swagger-dark' : 'swagger-light'}
        style={{ padding: '2rem', minHeight: '100vh' }}
      >
        <SwaggerUI url="/openapi/swagger.yaml" />
      </div>
    </Layout>
  );
}
