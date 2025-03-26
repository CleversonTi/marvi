<template>
    <section class="primary_section">
        <h4> Resumo dos pedidos</h4>
        <div class="filter_area">
            <Download/>
        </div>
    </section>
    <section class="primary_section">
        
        <div class="v-card-item__content">
            <div class="v-card-item_header">
                <div class="total">
                    <strong>
                        999
                    </strong>
                    <span>Total de Pedidos</span>
                </div>
                <div class="periodo">
                    <span>Periodo entre 18/07 - 23/09</span>
                </div>
            </div>
            <Graficos />
        </div>
        <div class="v-card-item__box">
            <div class="card fatura not-approved">
                <router-link :to="{name: 'pedidos'}"> 
                    <div class="total">
                            <strong>1</strong>
                    </div>
                    <div class="link">
                            <IconDirection stroke-width="1.5" size="20"/> 
                    </div>
                    <div class="description">
                       <span>
                            Pedidos não aprovados
                        </span> 
                    </div>
                </router-link>
            </div>
             <div class="card fatura unbilled">
                <router-link :to="{name: 'pedidos'}">  
                    <div class="total">
                            <strong>3</strong>
                    </div>
                    <div class="link">
                           <IconDirection stroke-width="1.5" size="20"/> 
                    </div>
                    <div class="description">
                        <span>
                            Pedidos não faturados

                        </span>
                    </div>
                </router-link>
            </div>
            <div class="card">
                <router-link :to="{name: 'pedidos'}"> 
                    <div class="total">
                            <strong>
                                300
                            </strong>
                    </div>
                    
                    <div class="description">
                        <span>
                            Pedidos não faturados
                        </span>
                    </div>
                </router-link>
            </div>
            <div class="card">
                <router-link :to="{name: 'pedidos'}"> 
                    <div class="total">
                            <strong>
                               20
                            </strong>
                    </div>
                    
                    <div class="description">
                        <span>
                           Pedidos aguardando envio
                        </span>
                    </div>
                </router-link>
            </div>
            <div class="card">
                <router-link :to="{name: 'pedidos'}">  
                    <div class="total">
                            <strong>
                                25t
                                </strong>
                    </div>
                    
                    <div class="description">
                       <span>
                        Peso dos pedidos
                        </span>
                    </div>
                </router-link>
            </div>
            <div class="card totalfaturamento">
                <router-link :to="{name: 'pedidos'}">  
                    <div class="total">
                           <strong>
                            R$ 90.000,00
                            </strong> 
                    </div>
                    
                    <div class="description">
                       <span>
                        Valor total do faturamento
                        </span>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
    
</template>

<script setup>
    
    import Download from '@/components/download/index.vue';
    import Graficos from '@/components/pedidos/resumo/Grafico.vue';
    import IconDirection from '@/components/icons/IconLeft.vue';
</script>

<style>

</style>