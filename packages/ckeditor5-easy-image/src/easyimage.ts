/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module easy-image/easyimage
 */

import { Plugin, type PluginDependencies } from 'ckeditor5/src/core';
import { logWarning } from 'ckeditor5/src/utils';

import CloudServicesUploadAdapter from './cloudservicesuploadadapter';

/**
 * The Easy Image feature, which makes the image upload in CKEditor 5 possible with virtually zero
 * server setup. A part of the [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/)
 * family.
 *
 * This is a "glue" plugin which enables:
 *
 * * {@link module:easy-image/cloudservicesuploadadapter~CloudServicesUploadAdapter}.
 *
 * This plugin requires plugin to be present in the editor configuration:
 *
 * * {@link module:image/image~Image},
 * * {@link module:image/imageupload~ImageUpload},
 *
 * See the {@glink features/images/image-upload/easy-image "Easy Image integration" guide} to learn how to configure
 * and use this feature.
 *
 * Check out the {@glink features/images/image-upload/image-upload comprehensive "Image upload" guide} to learn about
 * other ways to upload images into CKEditor 5.
 *
 * **Note**: After enabling the Easy Image plugin you need to configure the
 * [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/)
 * integration through {@link module:cloud-services/cloudservices~CloudServicesConfig `config.cloudServices`}.
 */
export default class EasyImage extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName(): 'EasyImage' {
		return 'EasyImage';
	}

	/**
	 * @inheritDoc
	 */
	public static get requires(): PluginDependencies {
		return [ CloudServicesUploadAdapter, 'ImageUpload' ];
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const editor = this.editor;

		if ( !editor.plugins.has( 'ImageBlockEditing' ) && !editor.plugins.has( 'ImageInlineEditing' ) ) {
			/**
			 * The Easy Image feature requires one of the following plugins to be loaded to work correctly:
			 *
			 * * {@link module:image/imageblock~ImageBlock},
			 * * {@link module:image/imageinline~ImageInline},
			 * * {@link module:image/image~Image} (loads both `ImageBlock` and `ImageInline`)
			 *
			 * Please make sure your editor configuration is correct.
			 *
			 * @error easy-image-image-feature-missing
			 * @param {module:core/editor/editor~Editor} editor
			 */
			logWarning( 'easy-image-image-feature-missing', editor );
		}
	}
}

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ EasyImage.pluginName ]: EasyImage;
	}
}
