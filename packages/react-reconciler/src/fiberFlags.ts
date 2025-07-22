export type Flags = number;

export const NoFlags = 0b0000000;
// 新增
export const Placement = 0b0000001;
// 更新
export const Update = 0b0000010;
// 删除
export const ChildDeletion = 0b0000100;
// 副作用
export const PassiveEffect = 0b0001000;

export const MutationMask = Placement | Update | ChildDeletion;

export const PassiveMask = PassiveEffect | ChildDeletion;
