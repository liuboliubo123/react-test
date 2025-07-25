// import {
// 	unstable_ImmediatePriority as ImmediatePriority,
// 	unstable_UserBlockingPriority as UserBlockingPriority,
// 	unstable_NormalPriority as NormalPriority,
// 	unstable_LowPriority as LowPriority,
// 	unstable_IdlePriority as IdlePriority,
// 	unstable_scheduleCallback as scheduleCallback,
// 	unstable_shouldYield as shouldYield,
// 	CallbackNode,
// 	unstable_getFirstCallbackNode as getFirstCallbackNode,
// 	unstable_cancelCallback as cancelCallback
// } from 'scheduler';

// import './style.css';
// const button = document.querySelector('button');
// const root = document.querySelector('#root');

// type Priority =
// 	| typeof IdlePriority
// 	| typeof LowPriority
// 	| typeof NormalPriority
// 	| typeof UserBlockingPriority
// 	| typeof ImmediatePriority;

// interface Work {
// 	count: number;
// 	priority: Priority;
// }

// const workList: Work[] = [];
// let prevPriority: Priority = IdlePriority;
// let curCallback: CallbackNode | null = null;

// [LowPriority, NormalPriority, UserBlockingPriority, ImmediatePriority].forEach(
// 	(priority) => {
// 		const btn = document.createElement('button');
// 		root?.appendChild(btn);
// 		btn.innerText = [
// 			'',
// 			'ImmediatePriority',
// 			'UserBlockingPriority',
// 			'NormalPriority',
// 			'LowPriority'
// 		][priority];
// 		btn.onclick = () => {
// 			workList.unshift({
// 				count: 100,
// 				priority: priority as Priority
// 			});
// 			schedule();
// 		};
// 	}
// );

// function schedule() {
// 	const cbNode = getFirstCallbackNode();
// 	const curWork = workList.sort((w1, w2) => w1.priority - w2.priority)[0];

// 	// 策略逻辑
// 	if (!curWork) {
// 		curCallback = null;
// 		cbNode && cancelCallback(cbNode);
// 		return;
// 	}

// 	const { priority: curPriority } = curWork;
// 	if (curPriority === prevPriority) {
// 		return;
// 	}
// 	// 更高优先级的work
// 	cbNode && cancelCallback(cbNode);

// 	curCallback = scheduleCallback(curPriority, perform.bind(null, curWork));
// }

// function perform(work: Work, didTimeout?: boolean) {
// 	/**
// 	 * 1. work.priority
// 	 * 2. 饥饿问题
// 	 * 3. 时间切片
// 	 */
// 	const needSync = work.priority === ImmediatePriority || didTimeout;
// 	while ((needSync || !shouldYield()) && work.count) {
// 		work.count--;
// 		insertSpan(work.priority + '');
// 	}

// 	// 中断执行 || 执行完
// 	prevPriority = work.priority;

// 	if (!work.count) {
// 		const workIndex = workList.indexOf(work);
// 		workList.splice(workIndex, 1);
// 		prevPriority = IdlePriority;
// 	}

// 	const prevCallback = curCallback;
// 	schedule();
// 	const newCallback = curCallback;

// 	if (newCallback && prevCallback === newCallback) {
// 		return perform.bind(null, work);
// 	}
// }

// function insertSpan(content) {
// 	const span = document.createElement('span');
// 	span.innerText = content;
// 	span.className = `pri-${content}`;
// 	doSomeBuzyWork(10000000);
// 	root?.appendChild(span);
// }

// function doSomeBuzyWork(len: number) {
// 	let result = 0;
// 	while (len--) {
// 		result += len;
// 	}
// }

// pop() 方法从一个数组中删除并返回最后一个元素给调用者。
// shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
// unshift() 方法将指定元素添加到数组的开头，并返回数组的新长度。

import {
	unstable_ImmediatePriority as ImmediatePriority,
	unstable_UserBlockingPriority as UserBlockingPriority,
	unstable_NormalPriority as NormalPriority,
	unstable_LowPriority as LowPriority,
	unstable_IdlePriority as IdlePriority,
	unstable_scheduleCallback as scheduleCallback,
	unstable_shouldYield as shouldYield,
	CallbackNode,
	unstable_getFirstCallbackNode as getFirstCallbackNode,
	unstable_cancelCallback as cancelCallback
} from 'scheduler';
import './style.css';
const button = document.querySelector('button');
const root = document.querySelector('#root');

type Priority =
	| typeof IdlePriority
	| typeof LowPriority
	| typeof NormalPriority
	| typeof UserBlockingPriority
	| typeof ImmediatePriority;

interface Work {
	count: number;
	priority: Priority;
}

const workList: Work[] = [];
let prevPriority: Priority = IdlePriority;
let curCallback: CallbackNode | null = null;

[LowPriority, NormalPriority, UserBlockingPriority, ImmediatePriority].forEach(
	(priority) => {
		const btn = document.createElement('button');
		root?.appendChild(btn);
		btn.innerText = [
			'',
			'ImmediatePriority',
			'UserBlockingPriority',
			'NormalPriority',
			'LowPriority'
		][priority];
		btn.onclick = () => {
			workList.unshift({
				count: 100,
				priority: priority as Priority
			});
			schedule();
		};
	}
);

function schedule() {
	// const curWork = workList.pop();
	// 排序从小到大, 取出最小的(数值越小优先级越高)
	const cbNode = getFirstCallbackNode();
	const curWork = workList.sort((w1, w2) => w1.priority - w2.priority)[0];

	// 策略逻辑
	if (!curWork) {
		curCallback = null;
		cbNode && cancelCallback(cbNode);
		return;
	}
	const { priority: curPriority } = curWork;
	if (curPriority === prevPriority) {
		return;
	}
	// 更高优先级的work
	cbNode && cancelCallback(cbNode);
	curCallback = scheduleCallback(curPriority, perform.bind(null, curWork));
	// if (curWork) {
	// 	perform(curWork);
	// }
}

function perform(work: Work, didTimeout?: boolean) {
	/**
	 * 1. work.priority
	 * 2. 饥饿问题
	 * 3. 时间切片
	 */
	const needSync = work.priority === ImmediatePriority || didTimeout;
	while ((needSync || !shouldYield()) && work.count) {
		work.count--;
		insertSpan(work.priority + '');
	}
	//  中断执行 || 执行完,移除work
	//  中断前记录上次priority
	prevPriority = work.priority;
	if (!work.count) {
		const workIndex = workList.indexOf(work);
		workList.splice(workIndex, 1);
		prevPriority = IdlePriority;
		console.log(workList, 'workList');
	}
	const prevCallback = curCallback;
	schedule();
	const newCallback = curCallback;
	if (newCallback && prevCallback === newCallback) {
		return perform.bind(null, work);
	}
}

function insertSpan(content) {
	const span = document.createElement('span');
	span.innerText = content;
	span.className = `pri-${content}`;
	doSomeBuzyWork(10000000);
	root?.appendChild(span);
}

function doSomeBuzyWork(len: number) {
	let result = 0;
	while (len--) {
		result += len;
	}
}
