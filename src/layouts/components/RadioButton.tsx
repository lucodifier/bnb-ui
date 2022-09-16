import * as React from "react";
import { Radio, RadioProps } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
  backgroundColor: "#ffffff",
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#E76C1A",
  boxShadow: "0 0 0 1px #E76C1A",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
});

export default function RadioButton(props: RadioProps) {
  return <Radio checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...props} />;
}
