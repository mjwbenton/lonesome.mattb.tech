import * as React from 'react';
import { NavigationEntry } from 'staircase-generator/features';
import HamburgerIcon from "./HamburgerIcon";

const Navigation: React.SFC<{navigation: NavigationEntry[]}> = ({navigation}) => {
    return <div className="mb-navigation">
        <input className="mb-navigation__expander-checkbox" type="checkbox" id="navigationExpander"/>
        <label className="mb-navigation__expander-label" htmlFor="navigationExpander"><HamburgerIcon /></label>
        <div className="mb-navigation__container">
            <ul className="mb-navigation__group">
                {navigation.filter((ne) => ne.group === 0).map((ne) =>
                    <li key={ne.path} className="mb-navigation__item">
                        <a href={`/${ne.path}`}
                                className="mb-navigation__link">
                            {ne.title}
                        </a>
                    </li>
                )}
            </ul>
            <ul className="mb-navigation__group">
                {navigation.filter((ne) => ne.group === 1).map((ne) =>
                    <li key={ne.path} className="mb-navigation__item">
                        <a href={`/${ne.path}`}
                           className="mb-navigation__link">
                            {ne.title}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    </div>;
};
export default Navigation;
