import React, { useState, useCallback } from "react";
import { Flex } from "atoms/Flex";
import { ImageWrapper } from "./Image.styles";

const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [fetched, setFetched] = useState(false);

  // lazy loaded
  const contentLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  console.warn("unused component => ", contentLoaded);

  const contentFetched = useCallback(() => {
    setFetched(true);
  }, []);

  return (
    <>
      {/* <LazyLoad debounce={false} offset={500} height="100%" onContentVisible={contentLoaded}> */}
      <Flex opacity={Number(fetched)} height="100%">
        <img
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          onLoad={contentFetched}
        />
      </Flex>
      {/* </LazyLoad> */}
      {(!loaded || !fetched) && (
        <Flex
          height="100%"
          opacity={Number(!loaded || !fetched)}
          position="absolute"
          top={0}
          left={0}
          right={0}
          maxWidth={{ xs: "20rem", md: "35rem" }}
          margin="auto"
        ></Flex>
      )}
    </>
  );
};

export const Image = React.memo(({ lazy, src, alt, ...rest }) => {
  return (
    <ImageWrapper {...rest}>
      {lazy ? (
        <LazyImage src={src} alt={alt} />
      ) : (
        <img src={src} alt={alt} width="100%" height="100%" />
      )}
    </ImageWrapper>
  );
});
