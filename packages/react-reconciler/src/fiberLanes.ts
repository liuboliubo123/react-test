import { FiberRootNode } from './fiber';

export type Lane = number;
export type Lanes = number;

export const SyncLane = 0b00001;
export const NoLane = 0b00000;
export const NoLanes = 0b00000;

export function mergeLanes(laneA: Lane, laneB: Lane): Lanes {
	return laneA | laneB;
}

export function requestUpdateLane() {
	// const isTransition = ReactCurrentBatchConfig.transition !== null;
	// if (isTransition) {
	// 	return TransitionLane;
	// }
	// 从上下文环境中获取Scheduler优先级
	// debugger;
	// const currentSchedulerPriority = unstable_getCurrentPriorityLevel();
	// const lane = schedulerPriorityToLane(currentSchedulerPriority);
	// return lane;

	return SyncLane;
}

// 选出优先级最高的lane
export function getHighestPriorityLane(lanes: Lanes): Lane {
	return lanes & -lanes;
}

export function markRootFinished(root: FiberRootNode, lane: Lane) {
	root.pendingLanes &= ~lane;
}
