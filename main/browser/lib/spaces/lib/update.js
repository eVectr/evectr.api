
'use strict';

module.exports = {
	Data:  [
		function (path, req) { 
			return   {
				"user_id": 0,
				"display_name": "",
				"email_address": "",
				"name": { "first": "", "last": "" },
				"photos": {
					"profile": "",
					"cover": ""
				},
				"details": {
					"hobbies": null,
					"languages": null,
					"nationalities": null,
					"religion": null,
					"identity": {
						"sex": null,
						"marital": null,
						"gender": null,
						"orient": null,
					},
					"misc": {
						"description": null,
						"education": {
							"institutions": null,
							"description": null
						}
					}
				},
				"location": {
					"id": 0, "label": "",
					"codes": { "region": "", "country": "" }
				},
				"services": [],
				"checks": { "verified": 0, "status": 0, },
				"birth_date": "",
				"member_since": "",
			};
		},
	],
	Call: function(path, params, query, body, files, user) {
		return {
			method:	'GET',
			path: 	'/user',
			params: { uids: user.Scopes.user_id },
			query:	Assign({},{single:true,links:true},query||{}),
			body:	body||{},
			files:	files||[]
		};
	},
	Build: function (Actions, Stores) {
		var THS = this;
		return function (res) {
			var PNL 	= { from: 'Evectr', name: ['Content','Panel'] },
				BLK 	= { from: 'Evectr', name: ['Content','Block'] },
				SBMT 	= { from: 'Evectr', name: ['Form','Button'] },
				BR  	= { tag: 'br' },
				HR  	= { tag: 'hr', props: { className: 'MTB spread' } },
				SUBMIT 	= function SUBMIT(label, style, start, size) { 
					return {	
						tag:	'div',
						props:	{ className: [start||'one',size||'spread'].join(' ') },
						items: 	[{ 	
							tag:	SBMT,
							props:	{ 
								kind: 	 'submit',
								styles: [style||'info'],
								block:	 true,
								large:	 true,
								label:	 label||'Submit',
							},
					}]	
				};	},
				dta 	= Imm.fromJS(THS.Data[0]()),
				mrg 	= Imm.fromJS(res);
			// -----
			res = dta.mergeDeepWith(
				function(o,n,k) { 
					return (IS(n)=='socket'?o||null:n);
				}, 	mrg
			).toJS();
			// -----
			var photos 			= res.photos||{},
				details 		= res.details||{},
				misc			= details.misc||{},
				description		= misc.description||'',
				education		= misc.education||{},
				institutions	= education.institutions,
				edudesc			= education.edudesc,
				hobbies			= details.hobbies,
				languages		= details.languages,
				nationalities	= details.nationalities,
				religion		= details.religion,
				identity		= details.identity||{},
				sex				= identity.sex,
				marital			= identity.marital,
				gender			= identity.gender,
				orient			= identity.orient,
				settings 		= res.settings||{},
				selects			= {
					sex: 		[
						{ value: 'M', label: 'Male' 	},
						{ value: 'F', label: 'Female' 	},
						{ value: 'I', label: 'Intersex' },
					],
					marital: 	[
						{ value: 'M', label: 'Married' 			 },
						{ value: 'S', label: 'Single' 			 },
						{ value: 'R', label: 'In a Relationship' },
					],
				};

			function fnull(v) { return !!v; }

			// -----
			return Stores.App.singleton.updateStore({
				header:		{
					title: 	{
						cover: 	photos.cover,
						user:	{
							mode:	'edit',
							photo: 	photos.profile,
							uname: 	'',
							name: 	{ First: 'My', Last: 'Profile' },
							badges: [],
							locale: null,
							sex:	null,
							age: 	null,
						},
					},
				},
				content: 	{
					built: 		true,
					segments: 	{
						copy: 	[
							{	 // BASIC INFO
								tag:	{ from: 'Evectr', name: ['Content','Panel'] },
								props: 	{ 
									name:	'user-info',
									header: { label: 'Basic Info', icon: 'user' },
									form: 	{
										'id':			'form-user-info',
										'data-action': 	'/edit/'+res.user_id,
										'method':		'PUT',
									},
									body:	[
										{	tag: BLK, props: { 
											name: 	'user-info', 
											align:	'gridSlice',
											items: 	[
												{ 	tag:	'div',
													props:	{ className: 'half' },
													items: 	[{
														tag:	{ from: 'Evectr', name: ['Form','Xput'] },
														props:	{
															id: 		'user-name-first',
															name: 		'eFirstName',
															kind:		'text',
															placeholder:'First Name',
															value:		 res.name.first,
															priority:	'*',
															validate: 	{
																pattern: /[A-z'-]+/,
																invalid: 'Please specify a valid First Name.',
															},
														}
												}]	},
												{ 	tag:	'div',
													props:	{ className: 'half' },
													items: 	[{
														tag:	{ from: 'Evectr', name: ['Form','Xput'] },
														props:	{
															id: 		'user-name-last',
															name: 		'eLastName',
															kind:		'text',
															placeholder:'Last Name',
															value:		 res.name.last,
															priority:	'*',
															validate: 	{
																pattern: /[A-z'-]+/,
																invalid: 'Please specify a valid Last Name.',
															},
														}
												}]	},
												{ 	tag:	'div',
													props:	{ className: 'most' },
													items: 	[{
														tag:	{ from: 'Evectr', name: ['Form','Xput'] },
														props:	{
															id: 		'user-display-name',
															name: 		'eUserName',
															kind:		'text',
															icon:		'at',
															placeholder:'Username',
															value:		 res.display_name,
															priority:	'*',
															validate: 	{
																pattern: /[\w_.-]+/,
																invalid: 'Please specify a valid Username.',
																allowed: ['A-z','0-9','_','.','-'],
															},
														}
												}]	},
												{ 	tag:	'div',
													props:	{ 
														className: 	'third', 
														style: 		{ 
															justifySelf: 'flex-end',
														} 
													},
													items: 	[{
														tag:	{ from: 'Evectr', name: ['Form','DateTime'] },
														props:	{
															id: 		'user-bd',
															name: 		'eBirthDate',
															icon:		'birthday-cake',
															limit:		{ min: 1900, max: 2003 },
															value:		res.birth_date,
															priority:	'*',
															validate: 	{
																pattern: /\d{4}-\d{2}-\d{2}/,
																invalid: 'Specify',
																allowed: ['mm','dd','yyyy'],
															},
														}
												}]	},
												{ 	tag:	'div',
													props:	{ className: 'spread' },
													items: 	[{
														tag:	{ from: 'Evectr', name: ['Form','Xput'] },
														props:	{
															id: 		'user-locale',
															name: 		'eLocation',
															kind:		'text',
															icon:		'location-arrow',
															placeholder:'Your Location',
															priority:	'*',
															hide: 		 true,
															value:		{
																value: res.location.id,
																label: res.location.label,
															},
															data:		{
																id:   'user-locale-sgst', 
																url:  '/search/for/locale',
																list: '/locale',
															},
															validate: 	{
																pattern: /[\w\d% ,;.-]+/,
																invalid: 'Please specify a City, Region and/or Country and choose your Locale from the list.',
															},
														}
												}]	},
										]}	}, 
										HR, SUBMIT('Update Info'),
									].filter(fnull),		
								},
							}, { // ABOUT ME
								tag:	{ from: 'Evectr', name: ['Content','Panel'] },
								props: 	{ 
									name:	'user-details',
									header: { label: 'Edit Profile', icon: 'edit', subs: [
										{ name: 'user-about',  		label: 'About Me'	},
										{ name: 'user-distinct', 	label: 'Other Info'	},
										{ name: 'user-educate', 	label: 'Education'	},
									]	},
									form: 	{
										'id':			'form-user-details',
										'data-action': 	'/edit/details/'+res.user_id,
										'method':		'PUT',
									},
									body:	[
										{
											tag:	BLK, props:  { 
												name: 	'user-about', 
												header: { fixed: true, label: 'About Me' },
												align:	'gridSlice',
												items: 	[
													{ 	tag:	'div',
														props:	{ className: 'spread' },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Area'] },
															props:	{
																id: 		'user-descr',
																name:		'eDescr',
																icon:		'book',
																rows:		 3,
																placeholder:'Please input a description of your choosing if you like here. This can be as a further elaboration on your hobbies or more in-depth description regarding yourself, occupation and family.',
																value:		 description,
															}
													}]	},
													{ 	tag:	'div',
														props:	{ className: 'spread' },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Xput'] },
															props:	{
																id: 		'user-hobbies',
																name:		'eHIDs',
																icon:		'futbol',
																placeholder:'Add some Hobbies',
																tokens:		 hobbies,
																strict: 	 true,
																levels:		[1,2,3,4,5,6,7,8,9,10],
																more: 		['Casual'],
																data:		{
																	id:   'user-hobbies-sgst', 
																	url:  '/search/for/hobbies',
																	list: '/get/hobbies',
																},
																help:		{ text: [{ tag: 'p', items: [
																	'Please input a list of your hobbies in order of preference. Your favorite should be first, followed by your second-favorite, and so forth.'
																]}]	},
															}
													}]	},
												],
											}
										}, BR, {
											tag:	BLK, props:  { 
												name: 	'user-distinct', 
												header: { fixed: true, label: 'Distinctions' },
												align:	'gridSlice',
												items: 	[
													{ 	tag:	'div',
														props:	{ className: 'spread' },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Xput'] },
															props:	{
																id: 		'user-lang',
																name:		'eLGIDs',
																icon:		'language',
																placeholder:'Add your Language(s)',
																tokens:		 languages,
																strict: 	 true,
																levels:		['A1','A2','B1','B2','C1','C2'],
																data:		{
																	id:   'user-lang-sgst', 
																	url:  '/search/for/languages',
																	list: '/get/languages',
																},
																help:		{ text: [
																	{ tag:  'p', items: ['You can input more than one language in this selection should you choose, but please use the format below:'] },
																	{ tag: 'ul', items: [{ tag: 'li', xerox: true, items: [
																		'Your primary language is entered first;',
																		'followed by a comma ,;',
																		'then all other subsequent languages (comma-separated), in the order of preference or skill.',
																	]}]	},
																	{ tag:  'p', items: ['Please see the placeholder example in the this input-box.'] },
																]	},
															}
													}]	},
													{ 	tag:	'div',
														props:	{ className: 'more' },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Xput'] },
															props:	{
																id: 		'user-nations',
																name:		'eNIDs',
																icon:		'flag',
																placeholder:[
																	'Add your Nationality',
																	'Add a Secondary Nationality',
																],
																limit:		 2,
																tokens:		 nationalities,
																strict: 	 true,
																data:		{
																	id:   'user-nations-sgst', 
																	url:  '/search/for/nationalities',
																	list: '/get/nationalities',
																},
																help:		{ text: [
																	{ tag:  'p', items: ['You can input a combination of two nationalities for instances where immigration or dual nationalities come into play.However, please input your primary identity as your nationality first, followed by a comma (,) then your secondary nationality.For example, Chinese-Americans would:'] },
																	{ tag: 'ul', items: [{ tag: 'li', xerox: true, items: [
																		'Input American first;',
																		'followed by a comma ,;',
																		'and then Chinese.',
																		'So you end up with, American, Chinese',
																	]}]	},
																]	},
															}
													}]	},
													{ 	tag:	'div',
														props:	{ className: 'some' },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Xput'] },
															props:	{
																id: 		'user-religion',
																name:		'eRID',
																icon:		'hand-peace',
																placeholder:'Religion',
																limit:		 1,
																tokens:		[religion],
																strict: 	 true,
																data:		{
																	id:   'user-religion-sgst', 
																	url:  '/search/for/religions',
																	list: '/get/religions',
																},
																help:		{ kind: 'warn', text: [{tag: 'p', items: [
																	'Something about Religion!!!',
																]}] 	},
															}
													}]	},
													{ 	tag:	'div',
														props:	{ className: 'more' },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Select'] },
															props:	{
																kind:		'slc-txt',
																id: 		'user-sex',
																name:		'Sex',
																icon:		'transgender-alt',
																title:		'Sex',
																options:	selects.sex,
																value:		sex,
																input:			{
																	kind: 		'tokens',
																	id: 		'user-orient',
																	name:		'eGID',
																	placeholder:'Orientation',
																	limit:		 1,
																	tokens:		[orient],
																	strict: 	 true,
																	data:		{
																		id:   'user-orient-sgst', 
																		url:  '/search/for/orientations',
																		list: '/get/orientations',
																	},
																},
																help:		{ text: [{tag: 'p', items: [
																	'People come in all shapes, sizes and Gender-Identifications. This is where you can express it.',
																]}] 	},
															}
													}]	},
													{ 	tag:	'div',
														props:	{ className: 'some' },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Select'] },
															props:	{
																id: 		'user-marital',
																name:		'Marital',
																icon:		'gem',
																title:		'Marital Status',
																options:	selects.marital,
																value:		marital
															}
													}]	},
												],
											}
										}, BR, {
											tag:	BLK, props:  { 
												name: 	'user-educate', 
												header: { fixed: true, label: 'Education' },
												align:	'gridSlice',
												items: 	[
													{ 	tag:	'div',
														props:	{ className: 'spread' },
														items: 	[
															{
																tag:	{ from: 'Evectr', name: ['Form','Area'] },
																props:	{
																	id: 		'user-edu',
																	name:		'eEdu',
																	icon:		'graduation-cap',
																	rows:		 2,
																	placeholder:'Name of School(s) Attended',
																	value:		institutions,
																}
															}, {
																tag:	{ from: 'Evectr', name: ['Form','Area'] },
																props:	{
																	id: 		'user-edudesc',
																	name:		'eEduDescr',
																	icon:		'ellipsis-h',
																	rows:		 2,
																	placeholder:'Describe your Education in more detail here if you choose. You may want to include Accreditation, Degrees and Diploma information.',
																	value:		edudesc,
																}
															}
														]	
													},
												]
											}
										}, HR, SUBMIT('Update Profile','norm')
									].filter(fnull),		
								},
							},
						],
						other: 	[
							{ 	 // TIPS
								tag:	{ from: 'Evectr', name: ['Content','Panel'] },
								props: 	{ 
									kind:	'side',
									name:	'tips',
									header: { label: 'Tips',  icon: 'info-circle' },
									align: 	'gridPair',
									body:	[],	
								}
							},
						],
					}
				},
			}, true);
		}
	}
}