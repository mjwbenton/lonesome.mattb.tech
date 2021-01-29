import React from "react";
import Layout from "../global/Layout";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import TwoRowText from "./TwoRowText";
import StripedList, { StripeElement } from "./StripedList";
import Infoline from "./Infoline";
import ContentBlock from "./ContentBlock";
import Prose from "./Prose";

export default () => (
  <Layout>
    <Prose>
      <p>
        <b>
          Note: This is a work in progress set of components to simplify this
          site.
        </b>
      </p>
    </Prose>
    <MaxWidthWrapper>
      <StripedList>
        <StripeElement index={1}>
          <TwoRowText row1="Row One" row2="Row Two" />
        </StripeElement>
        <StripeElement index={2}>
          <TwoRowText row1="Row One" row2="Row Two" />
          <p>
            Also here is some other text
            <br /> <br /> This text makes it taller <br /> <br /> Yeah it does
          </p>
        </StripeElement>
        <StripeElement index={3}>
          <TwoRowText row1="Row One" row2="Row Two" />
        </StripeElement>
      </StripedList>
    </MaxWidthWrapper>
    <MaxWidthWrapper>
      <ContentBlock>
        <div>This is a block component</div>
        <Infoline externalLinkUrl="#" externalLinkText="ab">
          Testing
        </Infoline>
      </ContentBlock>
      <ContentBlock>
        <div>This is another block component</div>
        <Infoline externalLinkUrl="#" externalLinkText="ab">
          Testing
        </Infoline>
      </ContentBlock>
    </MaxWidthWrapper>
  </Layout>
);
