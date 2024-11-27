import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      iframeUrl: null, // Iframe starts empty
    };
  }

  handleInputChange = (event) => {
    this.setState({ url: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { url } = this.state;
    const sanitizedUrl = this.sanitizeUrl(url);

    if (sanitizedUrl) {
      this.setState({ iframeUrl: sanitizedUrl });
    } else {
      alert('Please enter a valid URL.');
    }
  };

  sanitizeUrl = (url) => {
    try {
      // Ensure URL starts with http or https
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      return parsedUrl.href;
    } catch {
      return ''; // Return empty string for invalid URLs
    }
  };

  render() {
    const { url, iframeUrl } = this.state;

    return (
      <div style={{ padding: '20px' }}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={this.handleInputChange}
            placeholder="Enter URL"
            style={{ width: '400px', padding: '5px' }}
          />
          <button type="submit" style={{ marginLeft: '10px' }}>Go</button>
        </form>

        {iframeUrl && (
          <div
            style={{
              marginTop: '20px',
              border: '1px solid black',
              width: '100%',
              height: 'calc(100vh - 150px)', // Adjust height to fit
              position: 'relative',
            }}
          >
            <iframe
              src={iframeUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
              sandbox="allow-scripts allow-same-origin"
              title="Web Browser"
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
