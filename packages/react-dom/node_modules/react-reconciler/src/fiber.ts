import type { Key, Props, ReactElementType, Ref } from 'shared/ReactTypes';

import {
	FunctionComponent,
	HostComponent,
	Fragment,
	type WorkTag
} from './workTags';

import { type Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
// import { Lane, Lanes, NoLane, NoLanes } from './fiberLanes';
// import { Effect } from './fiberHooks';

export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref | null;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown;
	deletions: FiberNode[] | null;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key || null;
		// HostComponent <div> div DOM
		this.stateNode = null;
		// FunctionComponent () => {}
		this.type = null;

		// 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		// 同级的ul下面有好多个li标签, 用index标记
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		// 初始的props(工作之前的props)
		this.pendingProps = pendingProps;
		// 最终确定的props(工作完成之后的props)
		this.memoizedProps = null;
		this.memoizedState = null;
		this.updateQueue = null;
		this.alternate = null;
		// 副作用
		// 当前节点的改动(标记)
		this.flags = NoFlags;
		// 所有子节点的改动(标记)
		this.subtreeFlags = NoFlags;
		this.deletions = null;
	}
}

export class FiberRootNode {
	//  挂载点
	container: Container;
	// 根节点的fiber
	current: FiberNode;
	// 更新完成以后的hostrootfiber
	finishedWork: FiberNode | null;
	// lane 的集合
	// pendingLanes: Lanes;
	// 本次更新的lane
	// finishedLane: Lane;
	//
	// pendingPassiveEffects: PendingPassiveEffects;

	// callbackNode: CallbackNode | null;
	// callbackPriority: Lane;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
		// this.pendingLanes = NoLanes;
		// this.finishedLane = NoLane;

		// this.callbackNode = null;
		// this.callbackPriority = NoLane;

		// this.pendingPassiveEffects = {
		// 	unmount: [],
		// 	update: []
		// };
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;

	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);

		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
		wip.deletions = null;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};

export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;
	if (typeof type === 'string') {
		// <div/> type: 'div'
		fiberTag = HostComponent;
	} else if (typeof type !== 'function') {
		console.warn('为定义的type类型', element);
	}

	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}
