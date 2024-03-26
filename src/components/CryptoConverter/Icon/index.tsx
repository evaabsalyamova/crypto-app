import { SvgIcon, SvgIconProps } from "@mui/material";
import { IconNames, icons } from "../../../resources/icons";

interface IProps extends SvgIconProps {
  iconName: IconNames;
}

const Icon: React.FunctionComponent<IProps> = ({ iconName, ...props }) => (
  <SvgIcon {...props}>{icons[iconName]}</SvgIcon>
);
export default Icon;
