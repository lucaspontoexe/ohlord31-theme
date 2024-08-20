<!-- @component
Um componente feito só pra carregar as fontes pro editor de thumbnail
(ou qualquer outro que precise das fontes usadas)
-->

<div class="font_loader">
    <span class="poppins">.</span>
    <span class="lora">.</span>
</div>

<style>
    @font-face {
        font-family: "PoppinsBold";
        src: local("Poppins Bold"), local("Poppins"),
            url("/fonts/Poppins/Poppins-Bold.ttf") format("truetype");
    }

    @font-face {
        font-family: "Lora";
        src: local("Lora Italic"), local("Lora"),
            url("/fonts/Lora/Lora-Italic-VariableFont_wght.ttf") format("truetype");
    }

    .font_loader {
        visibility: hidden;
        position: fixed;
        top: 0px;
        left: 0px;
    }

    .poppins {
        font-family: "PoppinsBold";
    }

    .lora {
        font-family: "Lora";
    }
</style>
