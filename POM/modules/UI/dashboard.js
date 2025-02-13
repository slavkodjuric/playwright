export class dashboardCart {
    constructor(page) {
        this.page = page;
        this.productCartButton = page.locator(".p-tooltip-target-wrapper");
        this.pageCartButton = page.locator(".inline-flex items-center py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary hover:text-gray-600 focus:outline-none transition ease-in-out duration-150 p-button p-component");
        this.removeFromCartButton = page.locator(".p-button-icon p-c pi pi-times");
    }

    async cart(){
        await this.productCartButton.click();
        await this.pageCartButton.click();
        await this.removeFromCartButton.click();
    }
}
