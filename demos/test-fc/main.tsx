import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// scheduler 调用测试用例
// function App() {
// 	const [num, update] = useState(100);
// 	// debugger;
// 	return (
// 		<ul onClick={() => update(50)}>
// 			{new Array(num).fill(0).map((_, i) => {
// 				return <Child key={i}>{i}</Child>;
// 			})}
// 		</ul>
// 	);
// }

// function Child({ children }) {
// 	const now = performance.now();
// 	while (performance.now() - now < 4) {}
// 	return <li>{children}</li>;
// }

// function App() {
// 	const [num, setNum] = useState(100);

// 	return (
// 		<div
// 			onClick={() => {
// 				console.log('1233');
// 			}}
// 		>
// 			<div
// 				onClick={(e) => {
// 					// e.stopPropagation();
// 					setNum((n) => n + 1);
// 				}}
// 			>
// 				{num}
// 			</div>
// 		</div>
// 	);
// }

// function Child() {
// 	return <span>big-react</span>;
// }

// function App() {
// 	const [num, setNum] = useState(100);

// 	const arr =
// 		num % 2 === 0
// 			? [<li key={'1'}>1</li>, <li key={'2'}>2</li>, <li key={'3'}>3</li>]
// 			: [<li key={'3'}>3</li>, <li key={'2'}>2</li>, <li key={'1'}>1</li>];
// 	// const arr = [<li key="3">3</li>, <li key="2">2</li>, <li key="1">1</li>];
// 	return (
// 		<ul
// 			onClickCapture={() => {
// 				setNum((n) => n + 1);
// 			}}
// 		>
// 			{arr}
// 		</ul>
// 	);
// }

// function App() {
// 	const [num, setNum] = useState(100);
// 	const arr =
// 		num % 2 === 0
// 			? [<li key={'1'}>1</li>, <li key={'2'}>2</li>, <li key={'3'}>3</li>]
// 			: [<li key={'3'}>3</li>, <li key={'2'}>2</li>, <li key={'1'}>1</li>];
// 	return (
// 		<div
// 			onClickCapture={() => {
// 				setNum((n) => n + 1);
// 			}}
// 		>
// 			{/* <>
// 				<div>123</div>
// 				<div>456</div>
// 			</> */}
// 			<div>789</div>
// 			{arr}
// 		</div>
// 	);
// }

// function App() {
// 	const [num, setNum] = useState(100);
// 	return (
// 		<div
// 			onClickCapture={() => {
// 				setNum((n) => n + 1);
// 				setNum((n) => n + 2);
// 				setNum((n) => n + 3);
// 			}}
// 		>
// 			<div>{num}</div>
// 		</div>
// 	);
// }

// useEffect 测试用例
// function App() {
// 	const [num, updateNum] = useState(0);

// 	useEffect(() => {
// 		console.log('app mount');
// 	}, []);

// 	useEffect(() => {
// 		console.log('num change create', num);
// 		return () => {
// 			console.log('num change destroy', num);
// 		};
// 	}, [num]);
// 	return (
// 		<div
// 			onClick={() => {
// 				updateNum(num + 1);
// 			}}
// 		>
// 			{num === 0 ? <Child></Child> : 'noop'}
// 		</div>
// 	);
// }

// function Child() {
// 	useEffect(() => {
// 		console.log('child mount');

// 		return () => {
// 			console.log('child unmount');
// 		};
// 	}, []);

// 	return ' i am child';
// }

// react-noop-renderer
// function App() {
// 	return (
// 		<>
// 			<Child></Child>
// 			<div> hello world </div>
// 		</>
// 	);
// }

// function Child() {
// 	return 'Child';
// }

// const root = ReactDOM.createRoot();
// // debugger;
// root.render(<App></App>);

// window.root = root;

const root = ReactDOM.createRoot(document.getElementById('root'));

const jsx = (
	<div>
		<span>big-react</span>
	</div>
);
debugger;
root.render(jsx);
// 第一次创建:
// root 没有标记
// app 打了标记 flags=1
// ul  没有标记
// li*3 没有标记
// 3 没有标记
