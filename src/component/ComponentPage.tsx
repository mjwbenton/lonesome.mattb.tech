import React from "react";
import Layout from "../global/Layout";
import MaxWidthWrapper from "../global/MaxWidthWrapper";
import TwoRowText from "./TwoRowText";
import StripedList, { StripeElement } from "./StripedList";
import Infoline from "./Infoline";
import Block from "./Block";

export default () => (
  <Layout>
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
      <Block>
        <div>This is a block component</div>
        <Infoline externalLinkUrl="#" externalLinkText="ab">
          Testing
        </Infoline>
      </Block>
      <Block>
        <div>This is another block component</div>
        <Infoline externalLinkUrl="#" externalLinkText="ab">
          Testing
        </Infoline>
      </Block>
    </MaxWidthWrapper>
  </Layout>
);
