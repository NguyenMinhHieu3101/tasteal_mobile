import React, { useEffect, useState } from "react";
import { AccountEntity } from "../../../api/models/entities/AccountEntity/AccountEntity";
import { AccountService } from "../../../api/services/accountService";
import AuthorCarousel from "./AuthorCarousel";

const MostContributeAuthorsComponent = ({
  exceptUid,
}: {
  exceptUid?: string;
}) => {
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
        <AuthorCarousel array={mostContributedAuthors} />
      )}
    </>
  );
};

export default MostContributeAuthorsComponent;
