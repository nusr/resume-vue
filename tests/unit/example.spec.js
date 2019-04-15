import { shallowMount } from "@vue/test-utils";
import Print from "@/components/Print.vue";

describe("Print.vue", () => {
  it("renders props.userName when passed", () => {
    const userName = "nusr";
    const wrapper = shallowMount(Print, {
      propsData: { userName }
    });
    expect(wrapper.text()).toMatch("Email");
  });
});
