export class DashboardCart {
  constructor(page) {
    this.page = page;
    this.addProductCartButton = page.locator(
      ".px-1 ml-auto p-button p-component"
    );
    this.pageCartButton = page.locator(
      ".inline-flex items-center py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary hover:text-gray-600 focus:outline-none transition ease-in-out duration-150 p-button p-component"
    );
    this.removeFromCartButton = page.locator(".p-button-icon p-c pi pi-times");
    this.productAddedNotification = page.locator(
      ".Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter"
    );
  }

  async addProductToCart(index) {
    await this.addProductCartButton.nth(index).click();
  }
}
