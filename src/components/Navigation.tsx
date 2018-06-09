import * as React from 'react';
import { NavigationEntry } from 'staircase-generator/features';
import HamburgerIcon from "./HamburgerIcon";

const Navigation: React.SFC<{navigation: NavigationEntry[]}> = ({navigation}) => {
    return <div className="mb-navigation">
        <input className="mb-navigation__expander-checkbox" type="checkbox" id="navigationExpander"/>
        <label className="mb-navigation__expander-label" htmlFor="navigationExpander"><HamburgerIcon /></label>
        <div className="mb-navigation__container">
            <ul className="mb-navigation__main">
                {navigation.map((ne) =>
                    <li key={ne.path} className="mb-navigation__item">
                        <a href={`/${ne.path}`}
                                className="mb-navigation__link">
                            {ne.title}
                        </a>
                    </li>
                )}
            </ul>
            <ul className="mb-navigation__other">
                <li className="mb-navigation__item">
                    <a href="http://blog.mattbenton.co.uk"
                            className="mb-navigation__link">
                        Stream
                    </a>
                    &nbsp;To <a href="http://blog.mattbenton.co.uk">
                        blog.mattbenton.co.uk</a> &#8594;
                </li>
            </ul>
        </div>
    </div>;
};
export default Navigation;
