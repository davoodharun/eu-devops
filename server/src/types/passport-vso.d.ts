
// Add RequestValidation Interface on to Express's Request Interface.
interface Flash {
    flash(options: any, verify: any): void;
}

declare module "passport-vso";

