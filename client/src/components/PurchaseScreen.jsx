/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { PropTypes } from "prop-types";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Dialog,
  Box,
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";

// Define static payment details
const paymentDetails = {
  purchaseDate: new Date().toISOString().split("T")[0],
  nftName: "Sample NFT",
  contractAddress: "0x1234567890",
  valueETH: 1.5,
  conversionrate: 2265.65,
  valueUSD: 3000,
};

// Payment dialog component
function PaymentDialog(props) {
  const { onClose, open, handlePolicyDialogOpen } = props;

  // Close the payment dialog
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={false}
      sx={{ color: "#2a2a2a" }}
    >
      <DialogTitle>Payment Details</DialogTitle>
      <Box sx={{ display: "flex", justifyContent: "center", px: "auto" }}>
        <List
          sx={{
            width: "30vw",
            alignItems: "center",
            margin: "auto",
            borderRadius: "5vw",
          }}
        >
          {/* Render payment details */}
          <ListItem>
            <ListItemText
              primary={`Purchase Date: ${paymentDetails.purchaseDate}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`NFT Name: ${paymentDetails.nftName}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Contract Address: ${paymentDetails.contractAddress}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Value: ${paymentDetails.valueETH} ETH / $${paymentDetails.valueUSD}`}
            />
          </ListItem>
          {/* Checkbox to accept policy */}
          <ListItem>
            <Checkbox
              checked={props.accepted}
              onClick={(e) => {
                e.preventDefault();
                handlePolicyDialogOpen();
              }}
              inputProps={{ "aria-label": "Accept Policy" }}
            />
            <ListItemText primary="Accept Policy" />
          </ListItem>
          <ListItem>
            {/* Button to confirm payment */}
            <Button autoFocus onClick={handleClose} variant="contained">
              Confirm
            </Button>
          </ListItem>
        </List>
      </Box>
    </Dialog>
  );
}

PaymentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handlePolicyDialogOpen: PropTypes.func.isRequired,
  accepted: PropTypes.bool.isRequired,
};

// Policy dialog component
function PolicyDialog(props) {
  const { onAccept, open, setAccepted } = props;

  // Accept policy and close dialog
  const handleAccept = () => {
    setAccepted(true);
    onAccept();
  };

  // Close dialog without accepting policy
  const handleClose = () => {
    setAccepted(false);
    onAccept();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <DialogTitle mx={"auto"}>NFT Purchase User Agreement</DialogTitle>
      {/* Render user agreement */}
      <List
        sx={{
          width: "40vw",
          alignItems: "center",
          mx: "auto",
          gap: 2,
          px: "2vw",
        }}
      >
        {/* Add your policy list items here */}
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3">User Agreement</Typography>
        </ListItem>
        <Divider />
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>
            This User Agreement ("Agreement") is a legal agreement between you
            ("User") and <em>NiFTy</em>, governing your purchase of non-fungible
            tokens ("NFTs") through our platform.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">1. Acceptance of Terms</Typography>
          <Typography>
            By purchasing an NFT through our platform, you agree to be bound by
            the terms and conditions of this Agreement.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">2. Description of NFTs</Typography>
          <Typography>
            Our platform offers NFTs representing digital assets, artworks, or
            collectibles. Each NFT is unique and may have its own
            specifications, including but not limited to metadata, provenance,
            and intellectual property rights.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">3. Purchase and Ownership</Typography>
          <Typography>
            a. When you purchase an NFT, you acquire ownership rights to the
            digital asset represented by the NFT, subject to the terms of this
            Agreement and any applicable laws or regulations.
          </Typography>
          <Typography>
            b. Ownership of an NFT does not confer ownership of the underlying
            digital asset or intellectual property rights, unless explicitly
            stated otherwise.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">4. Payment and Transaction Fees</Typography>
          <Typography>
            a. You agree to pay the specified purchase price for the NFT,
            including any applicable taxes or transaction fees.
          </Typography>
          <Typography>
            b. Transaction fees may apply to NFT purchases, and these fees will
            be disclosed to you prior to completing the transaction.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">5. License and Usage</Typography>
          <Typography>
            a. Subject to the terms of this Agreement, you are granted a
            non-exclusive, non-transferable license to use and display the NFT
            for personal, non-commercial purposes.
          </Typography>
          <Typography>
            b. You may not reproduce, distribute, or modify the NFT without the
            explicit consent of the copyright owner.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">6. Risks and Disclaimers</Typography>
          <Typography>
            a. NFTs are subject to market volatility and may fluctuate in value.
            We do not guarantee any returns on your NFT investment.
          </Typography>
          <Typography>
            b. You acknowledge that NFTs may be subject to technical
            vulnerabilities, cyber-attacks, or other risks inherent to
            blockchain technology.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">7. Intellectual Property</Typography>
          <Typography>
            a. You represent and warrant that you have the necessary rights,
            licenses, or permissions to purchase and use the NFTs offered on our
            platform.
          </Typography>
          <Typography>
            b. We respect the intellectual property rights of others and expect
            our users to do the same. Any unauthorized use or distribution of
            copyrighted materials is strictly prohibited.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">8. Termination</Typography>
          <Typography>
            We reserve the right to terminate or suspend your access to our
            platform, in our sole discretion, for any violation of this
            Agreement or for any other reason.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">9. Governing Law</Typography>
          <Typography>
            This Agreement shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            laws principles.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">10. Changes to Terms</Typography>
          <Typography>
            We reserve the right to modify or update the terms of this Agreement
            at any time. Any changes will be effective immediately upon posting
            on our platform.
            <br />
            By purchasing an NFT through our platform, you signify your
            acceptance of this Agreement. If you do not agree to the terms and
            conditions stated herein, please refrain from purchasing NFTs
            through our platform.
            <br />
            For any questions or concerns regarding this Agreement, please
            contact us at [Your Contact Information].
          </Typography>
        </ListItem>
      </List>
      <Button autoFocus onClick={handleAccept} variant="contained">
        I Accept
      </Button>
    </Dialog>
  );
}

PolicyDialog.propTypes = {
  onAccept: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setAccepted: PropTypes.func.isRequired,
};

// PaymentDialogDemo component
export default function PaymentDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [policyDialogOpen, setPolicyDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePolicyDialogOpen = () => {
    setPolicyDialogOpen(true);
  };

  const handlePolicyDialogClose = () => {
    setPolicyDialogOpen(false);
  };

  const [accepted, setAccepted] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={handleClickOpen}
        style={{ borderRadius: "2vw" }}
      >
        Buy
      </Button>
      <PaymentDialog
        accepted={accepted}
        open={open}
        onClose={handleClose}
        handlePolicyDialogOpen={handlePolicyDialogOpen}
      />
      <PolicyDialog
        setAccepted={setAccepted}
        open={policyDialogOpen}
        onAccept={handlePolicyDialogClose}
      />
    </>
  );
}
