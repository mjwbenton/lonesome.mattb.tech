import * as React from 'react';
import { Photo } from 'staircase-generator/features';
import SinglePhoto from './Photo';

const Photos: React.SFC<{photos: Photo[]}> = ({photos}) => {
    return <div className="mb-photos">
        <ul>
            {photos.map((p) =>
                <li key={p.id}><SinglePhoto {...p} /></li>
            )}
        </ul>
    </div>;
};
export default Photos;

