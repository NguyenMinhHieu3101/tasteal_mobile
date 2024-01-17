import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { AccountEntity } from "../../../api/models/entities/AccountEntity/AccountEntity";
import { AccountService } from "../../../api/services/accountService";
import Carousel from "react-native-reanimated-carousel";
import AuthorCard from "./AuthorCard";

const MostContributeCarousel = ({ exceptUid }: { exceptUid?: string }) => {
  const width = Dimensions.get("screen").width;

  const [mostContributedAuthors, setMostContributedAuthors] = useState<
    AccountEntity[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AccountService.GetMostContributedAccounts(10).then(
          (data) => {
            if (exceptUid && exceptUid.length > 0) {
              return data.filter((account) => !exceptUid.includes(account.uid));
            } else {
              return data;
            }
          }
        );
        setMostContributedAuthors(data);
      } catch (error) {
        console.log(error);
        setMostContributedAuthors([]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {mostContributedAuthors && (
        <Carousel
          loop
          width={width}
          height={460}
          mode="parallax"
          autoPlay={true}
          data={mostContributedAuthors}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => {}}
          renderItem={({ index }) => (
            <AuthorCard author={mostContributedAuthors[index]} />
          )}
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 130,
          }}
        />
      )}
    </>
  );
};

export default MostContributeCarousel;
