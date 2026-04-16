"use strict";
class DemoProfileCardLayout extends HTMLElement {
    static get observedAttributes() {
        return [
            "name",
            "work-title",
            "initials",
            "image",
            "department",
            "email",
            "phone",
            "location",
            "meta",
        ];
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
    getAttr(attrName) {
        var _a;
        return ((_a = this.getAttribute(attrName)) !== null && _a !== void 0 ? _a : "").trim();
    }
    render() {
        const name = this.getAttr("name");
        const title = this.getAttr("work-title");
        const initials = this.getAttr("initials");
        const image = this.getAttr("image");
        const department = this.getAttr("department");
        const email = this.getAttr("email");
        const phone = this.getAttr("phone");
        const location = this.getAttr("location");
        const meta = this.getAttr("meta");
        const metaSegments = [department, location, meta]
            .filter(Boolean)
            .join(" • ");
        const contactSegments = [email, phone].filter(Boolean);
        this.setAttribute("role", "article");
        if (name) {
            this.setAttribute("aria-label", name);
        }
        this.innerHTML = "";
        const container = document.createElement("div");
        container.className = "demo-profile-card-layout-container";
        const inner = document.createElement("div");
        inner.className = "demo-profile-card-layout-inner";
        container.appendChild(inner);
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "demo-profile-card-layout-emp-image";
        if (image) {
            const img = document.createElement("img");
            img.src = image;
            img.alt = name ? `Profile image for ${name}` : "Profile image";
            img.className = "oj-avatar oj-avatar-bg-neutral oj-avatar-xxl oj-avatar-square oj-avatar-image";
            img.loading = "lazy";
            imageWrapper.appendChild(img);
        }
        else if (initials) {
            const fallback = document.createElement("div");
            fallback.className = "demo-profile-card-layout-emp-avatar-placeholder";
            fallback.textContent = initials;
            fallback.setAttribute("aria-hidden", "true");
            imageWrapper.appendChild(fallback);
        }
        inner.appendChild(imageWrapper);
        if (name) {
            const nameEl = document.createElement("div");
            nameEl.className =
                "oj-text-tertiary-color demo-profile-card-layout-emp-title oj-typography-body-md";
            nameEl.textContent = name;
            inner.appendChild(nameEl);
        }
        const spacer = document.createElement("div");
        spacer.className = "demo-profile-card-layout-emp-spacer";
        inner.appendChild(spacer);
        if (title) {
            const titleEl = document.createElement("div");
            titleEl.className =
                "demo-profile-card-layout-emp-title oj-typography-body-sm oj-text-color-secondary";
            titleEl.textContent = title;
            inner.appendChild(titleEl);
        }
        if (metaSegments) {
            const metaEl = document.createElement("div");
            metaEl.className =
                "demo-profile-card-layout-emp-more oj-typography-body-xs oj-text-color-tertiary";
            metaEl.textContent = metaSegments;
            inner.appendChild(metaEl);
        }
        if (contactSegments.length) {
            const contactList = document.createElement("ul");
            contactList.className = "demo-profile-card-layout-emp-contact";
            contactList.setAttribute("aria-label", "Contact details");
            contactSegments.forEach((segment) => {
                const item = document.createElement("li");
                item.textContent = segment;
                contactList.appendChild(item);
            });
            inner.appendChild(contactList);
        }
        const slotWrapper = document.createElement("div");
        slotWrapper.className = "demo-profile-card-layout-slot";
        const slot = document.createElement("slot");
        slotWrapper.appendChild(slot);
        inner.appendChild(slotWrapper);
        this.appendChild(container);
    }
}
if (!window.customElements.get("demo-profile-card-layout")) {
    window.customElements.define("demo-profile-card-layout", DemoProfileCardLayout);
}
