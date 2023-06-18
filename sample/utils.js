$(document).ready(() => {
	const importantInfoArray = [
		{
			name: 'kabob',
			inStock: 6,
			price: 11.5,
			details: ['rice', 'salad', 'bread', 'yogurt'],
			imgUrl:
				'https://www.foodologygeek.com/wp-content/uploads/2022/08/grilled-beef-shish-kabobs-recipe.jpg',
		},
		{
			name: 'manto',
			inStock: 3,
			price: 7.25,
			details: [],
			imgUrl: 'https://i.ytimg.com/vi/tkZl5Ydu0Cs/maxresdefault.jpg',
		},
		{
			name: 'qabuli',
			inStock: 5,
			price: 16.8,
			details: ['salad', 'chilis', 'bread'],
			imgUrl:
				'https://static.wixstatic.com/media/4c1904_b6f4bfa9a8224d77b588fd5d6f2036bd~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/4c1904_b6f4bfa9a8224d77b588fd5d6f2036bd~mv2.jpg',
		},
		{
			name: 'bolani',
			inStock: 4,
			price: 4.5,
			details: ['chutney'],
			imgUrl:
				'https://www.sandyathome.com/wp-content/uploads/2016/07/IMG_5855.jpg',
		},
		{
			name: 'bamya',
			inStock: 0,
			price: 12.0,
			details: ['chutney'],
			imgUrl:
				'https://assets.tmecosys.cn/image/upload/t_web767x639/img/recipe/ras/Assets/f210b7df-a4a1-4476-a8e7-7781753e395b/Derivates/c4232d90-e880-44c9-b889-edc83ab64d22.jpg',
		},
		{
			name: 'karahi',
			inStock: 11,
			price: 15.5,
			details: ['rice', 'bread', 'yogurt'],
			imgUrl:
				'https://recipe52.com/wp-content/uploads/2018/04/Chicken-Karahi-Recipe-Pakistani-1-of-1.jpg',
		},
	]

	const foods = [
		{
			name: 'kabob',
			counter: 0,
		},
		{
			name: 'manto',
			counter: 0,
		},
		{
			name: 'qabuli',
			counter: 0,
		},
		{
			name: 'bolani',
			counter: 0,
		},
		{
			name: 'bamya',
			counter: 0,
		},
		{
			name: 'karahi',
			counter: 0,
		},
	]

	const $starting = $('#starting')

	let totalPrice = 0
	const $totalElement = $('<div id="total"></div>').text(
		`Total price: $${totalPrice}`
	)
	const $enteredUserName = $('#username')
	const $enteredUserPassword = $('#password')
	const userLoginInfo = {
		userName: 'zomia',
		password: 'bootcamp',
	}
	const $orderSummary = $("<div id='order'><h4>Your order:</h4></div>")
	$starting.after($orderSummary)
	const $menu = $('#menu')
	const $order = $('#order')
	const $orderCheckout = $('#order-checkout')
	const $customerName = $('#customer-name')
	// const $customerNumber = $("#customer-number");
	const $payButton = $('#pay-now-button')

	function hideInitialElements() {
		$menu.hide()
		$order.hide()
		$orderCheckout.hide()
	}

	hideInitialElements()

	function checkerInfo() {
		$('#form').on('submit', (e) => {
			e.preventDefault()
			$('.msg').remove()
			if (
				$enteredUserName.val() === userLoginInfo.userName &&
				$enteredUserPassword.val() === userLoginInfo.password
			) {
				$('#login-form').hide()
				$menu.show()
				$order.show()
			} else if (
				$enteredUserName.val() !== userLoginInfo.userName &&
				$enteredUserPassword.val() !== userLoginInfo.password
			) {
				$('.errorMessage').append(
					`<p class='msg'>Your entered username: ${$enteredUserName.val()} can not be found, and your password: ${$enteredUserPassword.val()} is invalid</p>`
				)
			} else if ($enteredUserPassword.val() !== userLoginInfo.password) {
				$('.errorMessage').append(
					`<p class='msg'>Your entered password: ${$enteredUserPassword.val()} is invalid</p>`
				)
			} else {
				$('.errorMessage').append(
					`<p class='msg'>Your entered username: ${$enteredUserName.val()} can not be found</p>`
				)
			}
		})
	}

	checkerInfo()

	foods.forEach((food) => {
		const foodCounter = $(`<div></div>`)
			.attr('id', `${food.name}`)
			.text(`${food.name}: ${food.counter}`)

		$orderSummary.append(foodCounter)
	})

	importantInfoArray.forEach((foodSetObj, foodSetIndex) => {
		const $foodBox = $("<div class='foodBox card'></div>")
			.text(`${foodSetObj.name}`)
			.css('border', 'solid')
		$foodBox.append(
			$("<div class='price'></div>").text(`Price $${foodSetObj.price}`)
		)
		$foodBox.append(
			$("<div class='include'></div>").text(`Includes: ${foodSetObj.details}`)
		)

		const $foodImage = $(
			`<img class="foodImage" id="${foodSetObj.name}-image" src=${foodSetObj.imgUrl}>`
		)
		$foodBox.append($foodImage)

		const addButton = $getAddButton(foodSetObj, foodSetIndex)
		$foodBox.append(addButton)
		const removeButton = $getRemoveButton(foodSetObj, foodSetIndex)
		$foodBox.append(removeButton)

		$menu.append($foodBox)
	})

	function $getAddButton(foodSetObj, foodSetIndex) {
		return $("<button class='btn button'>Add Item</button>").on('click', () => {
			if (foodSetObj.inStock > 0) {
				importantInfoArray[foodSetIndex].inStock = foodSetObj.inStock - 1
				totalPrice += foodSetObj.price
				$totalElement.text(`Total price: $${totalPrice.toFixed(2)}`)
				let counter = (foods[foodSetIndex].counter += 1)
				$(`#${foodSetObj.name}`).text(`${foodSetObj.name}: ${counter}`)
			} else {
				alert(`We are all sold out of ${foodSetObj.name}`)
			}
		})
	}

	function $getRemoveButton(foodSetObj, foodSetIndex) {
		return $("<button class='btn button'>Remove Item</button>").on(
			'click',
			() => {
				if (foods[foodSetIndex].counter > 0) {
					totalPrice -= foodSetObj.price
					foodSetObj.inStock += 1
					$totalElement.text(`Total price: $${Math.abs(totalPrice.toFixed(2))}`)
					let counter = (foods[foodSetIndex].counter -= 1)
					$(`#${foodSetObj.name}`).text(`${foodSetObj.name}: ${counter}`)
				} else {
					alert(`You don't have any ${foodSetObj.name} left in your cart`)
				}
			}
		)
	}
	$order.append($totalElement)
	$order.append("<button id='checkout-btn'>Checkout</button>")
	$('#checkout-btn').on('click', () => {
		if (totalPrice > 0) {
			$menu.hide()
			$orderCheckout.show()
			$('#back-to-order-button').on('click', () => {
				$orderCheckout.hide()
				$menu.show()
				$totalElement.text(`Total price: $${totalPrice.toFixed(2)}`)
			})
		} else {
			alert('You have not added anything to your order!')
		}
	})
	$('#tip').on('change', (e) => {
		let totalWithTip = totalPrice
		let selectedValue = $('#tip option:selected').val()
		totalWithTip += totalWithTip * (selectedValue / 100)
		$totalElement.text(`Total price: $${totalWithTip.toFixed(2)}`)
	})
	$payButton.on('click', () => {
		if (typeof $customerName.val() !== 'string') {
			alert(`Name should be only filled with text`)
		} else if ($customerName.val() === '') {
			alert('Name can not be blank')
		} else {
			alert(`Thanks for your order ${$customerName.val()}`)
		}
	})
	var phoneRegex = /^\(?(\d{3})\)?[-.]?(\d{3})[-.]?(\d{4})$/

	// Function to handle the form submission
	function validatePhone(event) {
		event.preventDefault() // Prevent form submission

		// Get the phone number value from the input field
		var phoneNumber = $('#myform-phone').val()

		// Test the phone number against the regex pattern
		if (phoneRegex.test(phoneNumber)) {
			// Phone number is valid
			console.log('Phone number is valid')
		} else {
			// Phone number is invalid
			console.log('Phone number is invalid')
		}
	}

	// Attach the validatePhone function to the form submission event
	$('#myform').submit(validatePhone)
})
