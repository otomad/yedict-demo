// scss模块声明
declare module "*.scss" {
	const content: { [key: string]: any }
	export = content
};
// less模块声明
declare module "*.less" {
	const content: { [key: string]: any }
	export default content
};

declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.webp";
