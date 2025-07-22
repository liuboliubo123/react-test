export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText
	| typeof Fragment;

export const FunctionComponent = 0;
// 挂载点
export const HostRoot = 3;
// dom标签
export const HostComponent = 5;
// 文本节点
export const HostText = 6;
// fragment节点
export const Fragment = 7;
