import IHiddenOnly from "@/module/IHiddenOnly";
import React from "react";
import styles from "./Loading.module.scss";
import Root from "./Root";

export enum LoadingStatus {
	LOADING, FAILED
}

interface ILoadingState {
	status: LoadingStatus;
	errorInfo: string;
}

export default class Loading extends React.Component<IHiddenOnly, ILoadingState> {
	public constructor(props: IHiddenOnly) {
		super(props);
		Root.r.loading = this;
		this.state = {
			status: LoadingStatus.LOADING,
			errorInfo: "",
		};
	}
	public setStatus = (status: LoadingStatus, errorInfo: string = "") => {
		this.setState({ status, errorInfo });
	}
	public render() {
		return (
			<div className={styles.loadingPage} hidden={this.props.hidden}>
				<div className={styles.loadingRow}>
					{
						this.state.status === LoadingStatus.LOADING ? (
							<svg className={styles.loadingCircular} viewBox="25 25 50 50">
								<circle className={styles.path} cx="50" cy="50" r="20" fill="none" />
							</svg>
						) : <i className={"fa fa-close " + styles.failed} />
					}
					<span>
						{this.state.status === LoadingStatus.LOADING ? "加载中⋯⋯" : "查询失败！"}
					</span>
				</div>
				{
					this.state.status === LoadingStatus.FAILED && this.state.errorInfo ?
						<p>{this.state.errorInfo}</p> : undefined
				}
			</div>
		);
	}
}