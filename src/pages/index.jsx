import React from "react";
import { Spacer } from "../components/Spacer";
import { Flex, VStack, Center, Heading } from "@chakra-ui/react";
import { LandingPageIllustration } from '../components/LandingPageIllustration';
import { LandingPageNavigationCard } from "../components/LandingPageNavigatorCard";
import { useWindowSize } from "../utils/useWindowDimension";


export default function Home() {
  const windowDimension = useWindowSize();
  return (
    <div>
      <VStack>
        <Spacer height="100px"/>


        <Center>
          <Heading color="#59221d" size="2xl">
            Your next adventure awaits
          </Heading>
        </Center>

        <Spacer height="50px"/>

        <Center>
          <LandingPageIllustration width={windowDimension.width > 1180 ? '960px' : '80%'}/>
        </Center>

        <Spacer height="50px"/>

        <Heading color="#2d3340">
          🤔 I want to ... 
        </Heading>

        <Spacer height="30px"/>

        <Flex>
          <LandingPageNavigationCard
            title="Make a booking"
            emoji="🏨"
            href="/book"
          />
          <Spacer width="20px"/>
          <LandingPageNavigationCard
            title="Go to marketplace"
            emoji="🤝"
            href="/marketplace"
          />
        </Flex>
      </VStack>
    </div>
  );
}
