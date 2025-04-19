import { Registry } from '../../../../platform/registry/common/platform.js';
import { Extensions as ViewExtensions, IViewContainersRegistry, IViewsRegistry, ViewContainer, ViewContainerLocation } from '../../../common/views.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { ViewPaneContainer } from '../../../browser/parts/views/viewPaneContainer.js';
import { WebviewViewPane } from '../../webviewView/browser/webviewViewPane.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { localize2 } from '../../../../nls.js';

// Register the TenderAI container in the secondary sidebar (AuxiliaryBar)
const tenderAIContainer: ViewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: 'tenderai',
	title: localize2('tenderai.viewContainer.label', "TenderAI"),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, ['tenderai', { mergeViewWithContainerWhenSingleView: true }]),
	hideIfEmpty: false,
	order: 100,
	icon: Codicon.lightbulb
}, ViewContainerLocation.AuxiliaryBar, { isDefault: true, doNotRegisterOpenCommand: true });

// Register the TenderAI view inside the container
Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([{
	id: 'tender-ai.SidebarProvider',
	name: localize2('tenderai.view.name', "TenderAI"),
	ctorDescriptor: new SyncDescriptor(WebviewViewPane, []),
	containerIcon: tenderAIContainer.icon,
	containerTitle: tenderAIContainer.title.value,
	canToggleVisibility: false,
	canMoveView: true,
	openCommandActionDescriptor: { id: 'tenderai', title: tenderAIContainer.title, order: 1 }
}], tenderAIContainer);
