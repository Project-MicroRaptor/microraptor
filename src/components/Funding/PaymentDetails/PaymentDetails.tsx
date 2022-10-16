import { Button, Center, Heading, Text, Badge } from "@chakra-ui/react";
import styles from "./PaymentDetails.module.scss";

type PaymentDetailsProps = {
  name: string;
  page: number;
  setPage: (page: number) => void;
};

export default function PaymentDetails(props: PaymentDetailsProps) {
  return (
    <>
      <Center>
        <Badge variant="solid" colorScheme="red">
          Funding Currently Unavailable
        </Badge>
      </Center>
      <Center>
        <Heading className={styles.pageTitle} size="xl">
          Payment Details
        </Heading>
      </Center>
      <div className={styles.content}>
        <Heading className={styles.projectName}>{props.name}</Heading>
        <Heading size="md">Reference: XXXXXX</Heading>
        <Text>
          Thank you for wanting to support our project.
          <br />
          <br />
          There are two options below to make your contribution. <br />
          When making payment please ensure to include the above reference
          number and your name.
          <br />
          <br />
          <u>Electronic Fund Transfer (EFT)</u> <br />
          Account Name: <br />
          BSB: <br />
          Account Number:
          <br />
          <br />
          <u>Paypal</u> <br />
          You will be redirected to our paypal page to make a payment.
        </Text>
        <Button width="200px" background="orange" color="black" disabled>
          Paypal
        </Button>
      </div>
      <div className={styles.navigation}>
        <Button onClick={() => props.setPage(2)}>Back</Button>
      </div>
    </>
  );
}
