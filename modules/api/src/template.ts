import Handlebars = require("handlebars");
import { Photo } from "@mattb/flickr-api";

// Reimplementation of src/components/Photo.tsx
const SOURCE = `<div class="mb-photos"><ul>{{#photos}}
    <li>
        <div class="mb-photo">
            <img class="mb-photo__image" src="{{mainSource.url}}"
                srcset="{{#sources}}{{url}} {{width}}w{{#unless @last}}, {{/unless}}{{/sources}}"
                sizes="(max-width: 1090px) 100vw, 63vw"
                alt="Image titled '{{title}}'" />
            <div class="mb-photo__infoline">
                <h3 class="mb-photo__infoline__title">{{title}}</h3>
                <a class="mb-photo__infoline__flickr-link" href="{{pageUrl}}" title="Flickr Page">Fl</a>
            </div>
        </div>
    </li>
{{/photos}}</ul></div>`;

const TEMPLATE = Handlebars.compile(SOURCE);

export default function renderHtml(data: Photo[]): string {
  return TEMPLATE({ photos: data });
}
