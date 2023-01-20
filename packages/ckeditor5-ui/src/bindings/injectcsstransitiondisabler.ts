/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import type View from '../view';

/**
 * @module ui/bindings/injectcsstransitiondisabler
 */

/**
 * A decorator that brings the possibility to temporarily disable CSS transitions using
 * {@link module:ui/view~View} methods. It is helpful when, for instance, the transitions should not happen
 * when the view is first displayed but they should work normal in other cases.
 *
 * The methods to control the CSS transitions are:
 * * `disableCssTransitions()` – Adds the `.ck-transitions-disabled` class to the
 * {@link module:ui/view~View#element view element}.
 * * `enableCssTransitions()` – Removes the `.ck-transitions-disabled` class from the
 * {@link module:ui/view~View#element view element}.
 *
 * **Note**: This helper extends the {@link module:ui/view~View#template template} and must be used **after**
 * {@link module:ui/view~View#setTemplate} is called:
 *
 *		import injectCssTransitionDisabler from '@ckeditor/ckeditor5-ui/src/bindings/injectcsstransitiondisabler';
 *
 *		class MyView extends View {
 *			constructor() {
 *				super();
 *
 *				// ...
 *
 *				this.setTemplate( { ... } );
 *
 *				// ...
 *
 *				injectCssTransitionDisabler( this );
 *
 *				// ...
 *			}
 *		}
 *
 * The usage comes down to:
 *
 *		const view = new MyView();
 *
 *		// ...
 *
 *		view.disableCssTransitions();
 *		view.show();
 *		view.enableCssTransitions();
 *
 * @param {module:ui/view~View} view View instance that should get this functionality.
 */
export default function injectCssTransitionDisabler( view: View ): asserts view is ViewWithCssTransitionDisabler {
	const decorated = view as ViewWithCssTransitionDisabler;

	decorated.set( '_isCssTransitionsDisabled', false );

	decorated.disableCssTransitions = () => {
		decorated._isCssTransitionsDisabled = true;
	};

	decorated.enableCssTransitions = () => {
		decorated._isCssTransitionsDisabled = false;
	};

	decorated.extendTemplate( {
		attributes: {
			class: [
				decorated.bindTemplate.if( '_isCssTransitionsDisabled', 'ck-transitions-disabled' )
			]
		}
	} );
}

export type ViewWithCssTransitionDisabler = View & {
	_isCssTransitionsDisabled: boolean;
	disableCssTransitions(): void;
	enableCssTransitions(): void;
};

/**
 * @mixin CssTransitionMixin
 */
export function CssTransitionMixin<Base extends abstract new( ...args: Array<any> ) => View>( base: Base ): {
	new( ...args: ConstructorParameters<Base> ): InstanceType<Base> & {
		_isCssTransitionsDisabled: boolean;
		disableCssTransitions(): void;
		enableCssTransitions(): void;
		initializeMixin(): void;
};
	prototype: InstanceType<Base> & {
		_isCssTransitionsDisabled: boolean;
		disableCssTransitions(): void;
		enableCssTransitions(): void;
		initializeMixin(): void;
};
} {
	abstract class Mixin extends base {
		public _isCssTransitionsDisabled: boolean = false;

		public disableCssTransitions() {
			this._isCssTransitionsDisabled = true;
		}

		public enableCssTransitions() {
			this._isCssTransitionsDisabled = false;
		}

		protected initializeMixin(): void {
			this.extendTemplate( {
				attributes: {
					class: [
						this.bindTemplate.if( '_isCssTransitionsDisabled', 'ck-transitions-disabled' )
					]
				}
			} );
		}
	}

	return Mixin as any;
}
