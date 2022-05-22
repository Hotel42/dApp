
import React from "react";
import styles from './LandingPageNavigationCard.module.css';
import { FormControl, FormLabel, Input, Flex, VStack, Box, Center, Text, Heading } from "@chakra-ui/react";
import { Spacer } from "./Spacer";
import Link from 'next/link';

export function LandingPageNavigationCard({
  title,
  emoji,
  href,
}) {
  return (
    <Link href={href}>
      <div
        style={{
          'border': '1px solid #2d3340',
          'borderRadius': '10px',
          'padding': '10px',
          'color': '#2d3340',
        }}
        className={styles.landingPageNavigationCard}
      >
        <Heading size="md">
          <Flex>
            <span>{emoji}</span>
            <Spacer width="10px"/>
            <span>{title}</span>
          </Flex>
        </Heading>
      </div>
    </Link>
  );
}
