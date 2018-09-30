import * as React from 'react';

const RightSide: React.SFC<{contentHtml: string, photos: React.ReactChild}> = ({ contentHtml, photos }) => {
    return <div className="mb-rightside">
        <div className="mb-content"
             dangerouslySetInnerHTML={{ __html: contentHtml }} />
        {photos}
        <div id="jsExtensionPoint"></div>
    </div>;
};
export default RightSide;
