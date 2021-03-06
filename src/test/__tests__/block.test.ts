import { expressions } from '../../lib'
import { Helper } from '../../lib/manager/helper'

const testPath = 'src/test/__tests__/test'

describe('Block', () => {

	test('multine', () => {	
		const lines=`a=4; 
		b=a+2; 
	  output=a*b;` 
		let data:any = {}
		expressions.eval(lines,data)
		expect(24).toBe(data['output'])

		data = {}
		expressions.eval(`rectangle = {"x":50,"y":50,"width":80,"height":60}; 
		sleepSecs = 1;
		source=nvl(source,"data/source.jpg");`,data)
		expect(50).toBe(data['rectangle']['x'])
	})

	test('if', () => {	
		let data:any = {}
		expressions.eval(('output=1;if(1==2){output=2}else {output=3}'),data)
		expect(3).toBe(data['output'])

		expressions.eval('output=1;if(1==1){output=2;}else {output=3;}',data)
		expect(2).toBe(data['output'])

		expressions.eval(`if(1==2){
										output=2
								}else {
										output=3
								}`,data)
		expect(3).toBe(data['output']) 		
	})

	test('while', () => {	
		let data:any = {}
		
		expressions.eval(`i=0;
								while(i<=6){
									output=i*2;
									i=i+1;
								}`,data)
		expect(12).toBe(data['output']) 		
	})

	test('for', async ()  =>  {	
		let data:any = {}
		
		expressions.eval(`for(i=0;i<=6;i=i+1){
			output=i*2;
		}`,data)
		expect(12).toBe(data['output']) 
		
		data = {}
		let expression = await Helper.readFile(testPath+'/for-01.js') as string
		expressions.eval(expression, data)
		expect(45).toBe(data.total) 
	})

	test('forIn', async ()  =>  {	
		let data:any = {}
		const expression = await Helper.readFile(testPath + '/forIn-01.js') as string
		expressions.eval(expression, data)
		expect(2).toBe(data.y) 
	})

	

	// test('parseBlockControl', async () => {	
		
	// 	let expression = await Helper.readFile('test/blockControl-01.js') as string
		
	// 	let node = expressions.parse(expression)
	// 	let serialized =expressions.parser.serialize(node)
	// 	let serialized2 = {'id': '0', 'n': 'forIn', 't': 'forIn', 'c': [{'id': '0.0', 'n': 'x', 't': 'variable', 'c': []}, {'id': '0.1', 'n': 'array', 't': 'array', 'c': [{'id': '0.1.0', 'n': 1, 't': 'constant', 'c': []}, {'id': '0.1.1', 'n': 2, 't': 'constant', 'c': []}]}, {'id': '0.2', 'n': 'block', 't': 'block', 'c': [{'id': '0.2.0', 'n': 'if', 't': 'if', 'c': [{'id': '0.2.0.0', 'n': '>', 't': 'operator', 'c': [{'id': '0.2.0.0.0', 'n': 'x', 't': 'variable', 'c': []}, {'id': '0.2.0.0.1', 'n': 2, 't': 'constant', 'c': []}]}, {'id': '0.2.0.1', 'n': 'block', 't': 'block', 'c': [{'id': '0.2.0.1.0', 'n': 'print', 't': 'functionRef', 'c': [{'id': '0.2.0.1.0.0', 'n': 3, 't': 'constant', 'c': []}]}]}, {'id': '0.2.0.2', 'n': 'elif', 't': 'elif', 'c': [{'id': '0.2.0.2.0', 'n': '>', 't': 'operator', 'c': [{'id': '0.2.0.2.0.0','n': 'x', 't': 'variable', 'c': []}, {'id': '0.2.0.2.0.1', 'n': 1, 't': 'constant', 'c': []}]}, {'id': '0.2.0.2.1', 'n': 'block', 't': 'block', 'c': [{'id': '0.2.0.2.1.0', 'n': 'print', 't': 'functionRef', 'c': [{'id': '0.2.0.2.1.0.0', 'n': 2, 't': 'constant', 'c': []}]}]}]}, {'id': '0.2.0.3', 'n': 'else', 't': 'else', 'c': [{'id': '0.2.0.3.0', 'n': 'if', 't': 'if', 'c': [{'id': '0.2.0.3.0.0', 'n':'>', 't': 'operator', 'c': [{'id': '0.2.0.3.0.0.0', 'n': 'x', 't': 'variable', 'c': []}, {'id': '0.2.0.3.0.0.1', 'n': 0, 't': 'constant', 'c': []}]}, {'id': '0.2.0.3.0.1', 'n': 'block', 't': 'block', 'c': [{'id': '0.2.0.3.0.1.0', 'n': 'print', 't': 'functionRef', 'c': [{'id': '0.2.0.3.0.1.0.0', 'n': 1, 't': 'constant', 'c': []}]}]}, {'id': '0.2.0.3.0.2', 'n': 'else', 't': 'else', 'c': [{'id': '0.2.0.3.0.2.0', 'n': 'block', 't': 'block', 'c': [{'id': '0.2.0.3.0.2.0.0', 'n': 'print', 't': 'functionRef', 'c': [{'id': '0.2.0.3.0.2.0.0.0', 'n': 0, 't': 'constant', 'c': []}]}]}]}]}]}]}]}]}
	// 	expect(serialized2).toBe(serialized)

	// 	expression = await Helper.readFile('test/blockControl-02.js')as string
		
	// 	node = expressions.parser.serialize(node)
	// 	serialized=expressions.parser.serialize(node)
	// 	const serialized3 = {'id': '0', 'n': 'block', 't': 'block', 'c': [{'id': '0.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.0.0', 'n': 'list', 't': 'variable', 'c': []}, {'id': '0.0.1', 'n': 'array', 't': 'array', 'c': [{'id': '0.0.1.0', 'n': 1, 't': 'constant', 'c': []}, {'id': '0.0.1.1', 'n': 2, 't': 'constant', 'c': []}, {'id': '0.0.1.2', 'n': 3, 't': 'constant', 'c': []}, {'id': '0.0.1.3', 'n': 4, 't': 'constant', 'c': []}, {'id': '0.0.1.4', 'n': 5, 't': 'constant', 'c': []}, {'id': '0.0.1.5', 'n': 6, 't': 'constant', 'c': []}]}]}, {'id': '0.1', 'n': '=', 't': 'operator', 'c': [{'id': '0.1.0', 'n': 'b', 't': 'variable', 'c': []}, {'id': '0.1.1', 'n': 1, 't': 'constant', 'c': []}]}, {'id': '0.2', 'n': 'forIn', 't': 'forIn', 'c': [{'id': '0.2.0', 'n': 'a', 't': 'variable', 'c': []}, {'id': '0.2.1', 'n': 'list','t': 'variable', 'c': []}, {'id': '0.2.2', 'n': 'block', 't': 'block', 'c': [{'id': '0.2.2.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.2.2.0.0', 'n': 'b', 't': 'variable', 'c': []}, {'id': '0.2.2.0.1', 'n': '*', 't': 'operator', 'c': [{'id': '0.2.2.0.1.0', 'n': 'a', 't': 'variable', 'c': []}, {'id': '0.2.2.0.1.1', 'n': 'b', 't': 'variable', 'c': []}]}]}, {'id': '0.2.2.1', 'n': 'if', 't': 'if', 'c': [{'id': '0.2.2.1.0', 'n': '>', 't': 'operator', 'c': [{'id': '0.2.2.1.0.0', 'n': 'b', 't': 'variable', 'c': []}, {'id': '0.2.2.1.0.1', 'n': 10, 't': 'constant', 'c': []}]}, {'id': '0.2.2.1.1', 'n':'block', 't': 'block', 'c': [{'id': '0.2.2.1.1.0', 'n': 'break', 't': 'break', 'c': []}]}]}]}]}]}
	// 	expect(serialized2).toBe(serialized3)

	// 	expression = await Helper.readFile('test/blockControl-03.js')as string
		
	// 	node = expressions.parser.serialize(node)
	// 	serialized=expressions.parser.serialize(node)
	// 	const serialized4 = {'id': '0', 'n': 'block', 't': 'block', 'c': [{'id': '0.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.0.0', 'n': 'list', 't': 'variable', 'c': []}, {'id': '0.0.1', 'n': 'array', 't': 'array', 'c': [{'id': '0.0.1.0', 'n': 1, 't': 'constant', 'c': []}, {'id': '0.0.1.1', 'n': 2, 't': 'constant', 'c': []}, {'id': '0.0.1.2', 'n': 3, 't': 'constant', 'c': []}, {'id': '0.0.1.3', 'n': 4, 't': 'constant', 'c': []}, {'id': '0.0.1.4', 'n': 5, 't': 'constant', 'c': []}, {'id': '0.0.1.5', 'n': 6, 't': 'constant', 'c': []}, {'id': '0.0.1.6', 'n': 7, 't': 'constant', 'c': []}, {'id': '0.0.1.7', 'n': 8, 't': 'constant', 'c': []}, {'id': '0.0.1.8', 'n': 9, 't': 'constant', 'c': []}]}]}, {'id': '0.1', 'n': '=', 't': 'operator', 'c': [{'id': '0.1.0', 'n': 'total', 't': 'variable', 'c': []}, {'id': '0.1.1', 'n': 0, 't': 'constant', 'c': []}]}, {'id': '0.2', 'n': 'for', 't': 'for', 'c': [{'id': '0.2.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.2.0.0', 'n': 'i', 't': 'variable', 'c': []}, {'id': '0.2.0.1', 'n': 0, 't': 'constant', 'c': []}]}, {'id': '0.2.1', 'n': '<', 't': 'operator', 'c': [{'id': '0.2.1.0', 'n': 'i', 't': 'variable', 'c': []}, {'id': '0.2.1.1', 'n': 'length', 't': 'childFunction', 'c': [{'id': '0.2.1.1.0', 'n': 'list', 't': 'variable', 'c': []}]}]}, {'id': '0.2.2', 'n': '+=', 't': 'operator', 'c': [{'id': '0.2.2.0', 'n': 'i', 't': 'variable', 'c': []}, {'id': '0.2.2.1', 'n': 1, 't': 'constant', 'c': []}]}, {'id': '0.2.3', 'n': 'block', 't': 'block', 'c': [{'id': '0.2.3.0', 'n': '+=', 't': 'operator', 'c': [{'id': '0.2.3.0.0', 'n': 'total', 't': 'variable', 'c': []}, {'id': '0.2.3.0.1', 'n': '[]', 't': 'operator', 'c': [{'id': '0.2.3.0.1.0', 'n': 'list', 't': 'variable', 'c': []}, {'id': '0.2.3.0.1.1', 'n': 'i', 't': 'variable', 'c': []}]}]}]}]}]}
	// 	expect(serialized2).toBe(serialized4)

	// 	expression = await Helper.readFile('test/blockControl-04.js')as string
		
	// 	node = expressions.parser.serialize(node)
	// 	serialized=expressions.parser.serialize(node)
	// 	const serialized5 = {'id': '0', 'n': 'block', 't': 'block', 'c': [{'id': '0.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.0.0', 'n': 'a', 't': 'variable', 'c': []}, {'id': '0.0.1', 'n': 'x', 't': 'constant', 'c': []}]}, {'id': '0.1', 'n': 'switch', 't': 'switch', 'c': [{'id': '0.1.0', 'n': 'a', 't': 'variable', 'c': []}, {'id': '0.1.1', 'n': 'options', 't': 'options', 'c': [{'id': '0.1.1.0', 'n': 'x', 't': 'case', 'c': [{'id': '0.1.1.0.0', 'n': 'block', 't': 'block', 'c': [{'id': '0.1.1.0.0.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.1.1.0.0.0.0', 'n': 'i', 't': 'variable', 'c': []}, {'id': '0.1.1.0.0.0.1', 'n': 1, 't': 'constant', 'c': []}]}, {'id': '0.1.1.0.0.1', 'n': 'break', 't': 'break', 'c': []}]}]}, {'id': '0.1.1.1', 'n': 'y', 't': 'case', 'c': [{'id': '0.1.1.1.0', 'n': 'block', 't': 'block', 'c': [{'id': '0.1.1.1.0.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.1.1.1.0.0.0', 'n': 'i', 't': 'variable', 'c': []}, {'id': '0.1.1.1.0.0.1', 'n': 2, 't': 'constant', 'c': []}]}, {'id': '0.1.1.1.0.1', 'n':'break', 't': 'break', 'c': []}]}]}, {'id': '0.1.1.2', 'n': 'z', 't': 'case', 'c': [{'id': '0.1.1.2.0', 'n': 'block', 't': 'block', 'c': [{'id': '0.1.1.2.0.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.1.1.2.0.0.0', 'n': 'i', 't': 'variable', 'c': []}, {'id': '0.1.1.2.0.0.1', 'n': 3, 't': 'constant', 'c': []}]}, {'id': '0.1.1.2.0.1', 'n': 'break', 't': 'break', 'c': []}]}]}, {'id': '0.1.1.3', 'n': 'default', 't': 'default', 'c': [{'id': '0.1.1.3.0', 'n': 'block', 't': 'block', 'c': [{'id': '0.1.1.3.0.0', 'n': '=', 't': 'operator', 'c': [{'id': '0.1.1.3.0.0.0', 'n': 'i', 't': 'variable', 'c': []}, {'id': '0.1.1.3.0.0.1', 'n': 4, 't': 'constant', 'c': []}]}, {'id': '0.1.1.3.0.1', 'n': 'break', 't': 'break', 'c': []}]}]}]}]}]}
	// 	expect(serialized2).toBe(serialized5)
	// })

})	