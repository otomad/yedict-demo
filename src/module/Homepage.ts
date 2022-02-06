import { ModeType } from "@/components/Navbar";
import React from "react";
import IClassNameOnly from "./IClassNameOnly";

export default abstract class Homepage extends React.Component<IClassNameOnly, {}> {
	static mode: ModeType;
}
