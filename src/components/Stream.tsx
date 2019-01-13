import React from "react";
import { Photo } from "@mattb/gatsby-transform-flickr-set";
import SinglePhoto from "./Photo";

export default class Stream extends React.Component<
  {},
  { photos: Array<Photo> | null }
> {
  constructor(props) {
    super(props);
    this.state = {
      photos: null
    };
  }
  componentDidMount() {
    fetch("https://umpghq4xo2.execute-api.us-east-1.amazonaws.com/Prod/photos")
      .then(response => response.json())
      .then(photos => this.setState({ photos }));
  }
  render() {
    if (this.state.photos == null) {
      return "Loading...";
    }
    return (
      <div className="mb-photos">
        <ul>
          {this.state.photos.map(p => (
            <li key={p.pageUrl}>
              <SinglePhoto {...p} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
