import React from "react";

export default class Stream extends React.Component<{}, { html: string }> {
  constructor(props) {
    super(props);
    this.state = {
      html: "Loading..."
    };
  }
  componentDidMount() {
    fetch("https://umpghq4xo2.execute-api.us-east-1.amazonaws.com/Prod/photos")
      .then(response => response.text())
      .then(html => this.setState({ html }));
  }
  render() {
    return (
      <div
        className="mb-stream"
        dangerouslySetInnerHTML={{ __html: this.state.html }}
      />
    );
  }
}
