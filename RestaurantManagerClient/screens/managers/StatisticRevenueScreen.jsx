import React from "react";
import { ActivityIndicator, Button, TouchableOpacity, Dimensions, View, Text, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { StatisticRevenueStyle } from "../../styles/LayoutStyle";
import { host, port, orderListUrl } from '../../apis/ManagerApi';
import { Icon } from 'react-native-elements';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


class StatisticRevenueScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalFilterRevenueType: false,
            modalFilterRevenueTypeInitial: 0,
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,
            flag: true,
            chartConfig: {
                decimalPlaces: 0,
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false
            },
            dataValueChart: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            },
            dataLabelDateOfChart: [],
            dataValueDateOfChart: [],
            dataSortDateChart: [],
            outputDate: '',
            outputExpense: '',
            outputRevenue: '',
            outputProfit: '',
            outputpercent: '',
            outputRevenueChart: '',
            inputDate: '',
            error: '',
            flagDate: false,
            flag: true
        };
    }

    onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        var extraDate = '';
        var extraMonth = '';
        if ((currentDate.getMonth() + 1) < 10) extraMonth = '0';
        if (currentDate.getDate() < 10) extraDate = '0';

        this.setState({ flagDate: false, inputDate: currentDate.getFullYear() + '-' + extraMonth + (currentDate.getMonth() + 1) + '-' + extraDate + currentDate.getDate(), outputDate: extraDate + currentDate.getDate() + '/' + extraMonth + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() });
        this.getRevenueValue(this.state.inputDate);
        this.setRevenueOfChart(this.state.inputDate);

    };
    formatMoneyDatabasetoView = (input) => {
        const formatter = new Intl.NumberFormat('vi-VN',
            {
                style: 'currency', currency: 'VND'
            })
        return formatter.format(input);
    }
    componentDidMount(){
        var currentDate = new Date(Date.now());
        var extraDate = '';
        var extraMonth = '';
        var getInputDate = '';
        var getOutputDate = '';
        if ((currentDate.getMonth() + 1) < 10) extraMonth = '0';
        if (currentDate.getDate() < 10) extraDate = '0';
        getInputDate = currentDate.getFullYear() + '-' + extraMonth + (currentDate.getMonth() + 1) + '-' + extraDate + currentDate.getDate();
        getOutputDate = extraDate + currentDate.getDate() + '/' + extraMonth + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
        this.setState({ inputDate: getInputDate, outputDate: getOutputDate });
        this.getRevenueValue(getInputDate);
        this.setOutputRevenueType();
        this.setRevenueOfChart(getInputDate);
    }

    modalFilterRevenueTypeView(isVisible) {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={isVisible}
                >
                    <View style={{ backgroundColor: 'white', padding: '3%', borderRadius: 15 }}>

                        <Text>Thống kê theo:</Text>
                        <Text></Text>
                        <RadioForm
                            radio_props={
                                [
                                    { label: 'Ngày', value: 0 },
                                    { label: 'Tháng', value: 1 },
                                    { label: 'Năm', value: 2 }

                                ]
                            }
                            initial={this.state.modalFilterRevenueTypeInitial}
                            onPress={(value) => { this.setState({ modalFilterRevenueTypeInitial: value }) }}
                        />
                        <Text></Text>
                        <Button title="Xác nhận" onPress={() => { this.setOutputRevenueType(); }} />
                    </View>
                </Modal>
            </View>
        );
    }
    setOutputRevenueType() {
        if (this.state.modalFilterRevenueTypeInitial == 0) {
            this.setState({ outputRevenueType: 'ngày', modalFilterRevenueType: false });
            this.setRevenueOfChart(this.state.inputDate);
            this.getRevenueValue(this.state.inputDate);
        }
        if (this.state.modalFilterRevenueTypeInitial == 1) {
            this.setState({ outputRevenueType: 'tháng', modalFilterRevenueType: false });
            this.setRevenueOfChart(this.state.inputDate);
            this.getRevenueValue(this.state.inputDate);
        }
        if (this.state.modalFilterRevenueTypeInitial == 2) {
            this.setState({ outputRevenueType: 'năm', modalFilterRevenueType: false });
            this.setRevenueOfChart(this.state.inputDate);
            this.getRevenueValue(this.state.inputDate);
        }
    }


    setRevenueOfChart(date) {
        this.setState({ flag: true, dataSortDateChart: [] });
        var getDate = new Date(date);
        if (this.state.modalFilterRevenueTypeInitial == 0) {
            for (var i = 1; i <= getDate.getUTCDate(); i++) {
                var getExtraDate = getDate.getFullYear() + '/' + (getDate.getMonth() + 1) + '/' + i;
                this.getRevenueOfChart(getExtraDate);
                if (i != getDate.getUTCDate()) {
                    this.setState({ flag: true });
                }
            }

        }
        if (this.state.modalFilterRevenueTypeInitial == 1) {
            for (var i = 1; i <= getDate.getMonth() + 1; i++) {
                var getExtraDate = getDate.getFullYear() + '/' + i + '/' + getDate.getUTCDate();
                this.getRevenueOfChart(getExtraDate);
                if (i != (getDate.getMonth() + 1)) {
                    this.setState({ flag: true });
                }
            }

        }
        if (this.state.modalFilterRevenueTypeInitial == 2) {
            for (var i = 2018; i <= getDate.getFullYear(); i++) {
                var getExtraDate = i + '/' + (getDate.getMonth() + 1) + '/' + getDate.getUTCDate();
                this.getRevenueOfChart(getExtraDate);
                if (i != (getDate.getFullYear())) {
                    this.setState({ flag: true });
                }
            }

        }

    }


    getRevenueOfChart(date) {

        if (this.state.modalFilterRevenueTypeInitial == 0) {
            var getDate = new Date(date);
            fetch(host + ':' + port + orderListUrl, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                }
            })
                .then(response => response.json())
                .then(dataJson => {
                    setTimeout(
                        () => {
                            var maxResource = 0;
                            var getLabelChart = [];
                            var getDataofDataSet = [];
                            var getSortDateChart = this.state.dataSortDateChart;
                            var getOrder = [];
                            var getRevenue = 0;
                            var getExpense = 0;
                            var getExpenseDrink = 0;
                            var getExpenseDish = 0;

                            for (const element of dataJson) {
                                var getDateofOrder = new Date(element.time);
                                if ((getDateofOrder.getUTCDate() == getDate.getUTCDate()) && (getDateofOrder.getMonth() == getDate.getMonth()) && (getDateofOrder.getFullYear() == getDate.getFullYear())) {
                                    for (const element_f of element.dishs) {
                                        getRevenue = getRevenue + Number(element_f.dish.price) * Number(element_f.quantity);
                                        var getExpenseDishTotalResource = 0;
                                        for (const element_s of element_f.dish.resources) {
                                            var maxResource = 0;
                                            for (const element_t of element_s.resource.shipments) {
                                                if (element_s.id.resource_id == element_t.id.resource_id && maxResource < element_t.price) { maxResource = element_t.price; }
                                            }

                                            getExpenseDishTotalResource = getExpenseDishTotalResource + Number(element_s.quantity) * Number(maxResource);
                                        }
                                        getExpense = getExpense + getExpenseDishTotalResource;
                                    }
                                    for (const element_f of element.drinks) {
                                        getRevenue = getRevenue + Number(element_f.drink.price) * Number(element_f.quantity);

                                        var getShipmentDrink = element_f.drink.shipments;
                                        getShipmentDrink.sort(function (a, b) {
                                            a = new Date(a.price);
                                            b = new Date(b.price);
                                            return a > b ? -1 : a < b ? 1 : 0;
                                        });
                                        if (getShipmentDrink.length > 0) {
                                            getExpenseDrink = Number(element_f.quantity) * Number(getShipmentDrink[0].price);
                                        }
                                        else {
                                            getExpenseDrink = 0;
                                        }
                                        getExpense = getExpense + getExpenseDrink;
                                        //console.log();

                                    }

                                }


                            }

                            getSortDateChart.push({ id: getDate.getUTCDate(), value: Number(getRevenue) - Number(getExpense) });
                            getSortDateChart.sort(function (a, b) {
                                a = new Date(a.id);
                                b = new Date(b.id);
                                return a > b ? 1 : a < b ? -1 : 0;
                            });


                            for (const element of getSortDateChart) {
                                getLabelChart.push('Ngày ' + element.id);
                                getDataofDataSet.push(element.value);

                            }
                            this.setState({
                                flag: false,
                                dataLabelDateOfChart: getLabelChart,
                                dataValueDateOfChart: getDataofDataSet,
                                dataValueChart: {
                                    labels: getLabelChart, datasets: [{
                                        data: getDataofDataSet
                                    }]
                                },
                            });

                        },
                        1
                    )

                })
                .catch(error => {
                    console.log(error);
                });

        }


        if (this.state.modalFilterRevenueTypeInitial == 1) {
            var getDate = new Date(date);
            fetch(host + ':' + port + orderListUrl, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                }
            })
                .then(response => response.json())
                .then(dataJson => {
                    setTimeout(
                        () => {
                            var maxResource = 0;
                            var getLabelChart = [];
                            var getDataofDataSet = [];
                            var getSortDateChart = this.state.dataSortDateChart;
                            var getOrder = [];
                            var getRevenue = 0;
                            var getExpense = 0;
                            var getExpenseDrink = 0;
                            var getExpenseDish = 0;

                            for (const element of dataJson) {
                                var getDateofOrder = new Date(element.time);
                                if ((getDateofOrder.getMonth() == getDate.getMonth()) && (getDateofOrder.getFullYear() == getDate.getFullYear())) {
                                    for (const element_f of element.dishs) {
                                        getRevenue = getRevenue + Number(element_f.dish.price) * Number(element_f.quantity);
                                        var getExpenseDishTotalResource = 0;
                                        for (const element_s of element_f.dish.resources) {
                                            var maxResource = 0;
                                            for (const element_t of element_s.resource.shipments) {
                                                if (element_s.id.resource_id == element_t.id.resource_id && maxResource < element_t.price) { maxResource = element_t.price; }
                                            }

                                            getExpenseDishTotalResource = getExpenseDishTotalResource + Number(element_s.quantity) * Number(maxResource);
                                        }
                                        getExpense = getExpense + getExpenseDishTotalResource;
                                    }
                                    for (const element_f of element.drinks) {
                                        getRevenue = getRevenue + Number(element_f.drink.price) * Number(element_f.quantity);

                                        var getShipmentDrink = element_f.drink.shipments;
                                        getShipmentDrink.sort(function (a, b) {
                                            a = new Date(a.price);
                                            b = new Date(b.price);
                                            return a > b ? -1 : a < b ? 1 : 0;
                                        });
                                        if (getShipmentDrink.length > 0) {
                                            getExpenseDrink = Number(element_f.quantity) * Number(getShipmentDrink[0].price);
                                        }
                                        else {
                                            getExpenseDrink = 0;
                                        }
                                        getExpense = getExpense + getExpenseDrink;
                                        //console.log();

                                    }

                                }


                            }

                            getSortDateChart.push({ id: (getDate.getMonth() + 1), value: Number(getRevenue) - Number(getExpense) });
                            getSortDateChart.sort(function (a, b) {
                                a = new Date(a.id);
                                b = new Date(b.id);
                                return a > b ? 1 : a < b ? -1 : 0;
                            });


                            for (const element of getSortDateChart) {
                                getLabelChart.push('Tháng ' + element.id);
                                getDataofDataSet.push(element.value);

                            }
                            this.setState({
                                flag: false,
                                dataLabelDateOfChart: getLabelChart,
                                dataValueDateOfChart: getDataofDataSet,
                                dataValueChart: {
                                    labels: getLabelChart, datasets: [{
                                        data: getDataofDataSet
                                    }]
                                },
                            });

                        },
                        1
                    )

                })
                .catch(error => {
                    console.log(error);
                });

        }



        if (this.state.modalFilterRevenueTypeInitial == 2) {
            var getDate = new Date(date);
            fetch(host + ':' + port + orderListUrl, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                }
            })
                .then(response => response.json())
                .then(dataJson => {
                    setTimeout(
                        () => {
                            var maxResource = 0;
                            var getLabelChart = [];
                            var getDataofDataSet = [];
                            var getSortDateChart = this.state.dataSortDateChart;
                            var getOrder = [];
                            var getRevenue = 0;
                            var getExpense = 0;
                            var getExpenseDrink = 0;
                            var getExpenseDish = 0;

                            for (const element of dataJson) {
                                var getDateofOrder = new Date(element.time);
                                if ((getDateofOrder.getFullYear() == getDate.getFullYear())) {
                                    for (const element_f of element.dishs) {
                                        getRevenue = getRevenue + Number(element_f.dish.price) * Number(element_f.quantity);
                                        var getExpenseDishTotalResource = 0;
                                        for (const element_s of element_f.dish.resources) {
                                            var maxResource = 0;
                                            for (const element_t of element_s.resource.shipments) {
                                                if (element_s.id.resource_id == element_t.id.resource_id && maxResource < element_t.price) { maxResource = element_t.price; }
                                            }

                                            getExpenseDishTotalResource = getExpenseDishTotalResource + Number(element_s.quantity) * Number(maxResource);
                                        }
                                        getExpense = getExpense + getExpenseDishTotalResource;
                                    }
                                    for (const element_f of element.drinks) {
                                        getRevenue = getRevenue + Number(element_f.drink.price) * Number(element_f.quantity);

                                        var getShipmentDrink = element_f.drink.shipments;
                                        getShipmentDrink.sort(function (a, b) {
                                            a = new Date(a.price);
                                            b = new Date(b.price);
                                            return a > b ? -1 : a < b ? 1 : 0;
                                        });
                                        if (getShipmentDrink.length > 0) {
                                            getExpenseDrink = Number(element_f.quantity) * Number(getShipmentDrink[0].price);
                                        }
                                        else {
                                            getExpenseDrink = 0;
                                        }
                                        getExpense = getExpense + getExpenseDrink;
                                        //console.log();

                                    }

                                }


                            }

                            getSortDateChart.push({ id: getDate.getFullYear(), value: Number(getRevenue) - Number(getExpense) });
                            getSortDateChart.sort(function (a, b) {
                                a = new Date(a.id);
                                b = new Date(b.id);
                                return a > b ? 1 : a < b ? -1 : 0;
                            });


                            for (const element of getSortDateChart) {
                                getLabelChart.push('Năm ' + element.id);
                                getDataofDataSet.push(element.value);

                            }
                            this.setState({
                                flag: false,
                                dataLabelDateOfChart: getLabelChart,
                                dataValueDateOfChart: getDataofDataSet,
                                dataValueChart: {
                                    labels: getLabelChart, datasets: [{
                                        data: getDataofDataSet
                                    }]
                                },
                            });

                        },
                        1
                    )

                })
                .catch(error => {
                    console.log(error);
                });

        }
    }

    getRevenueValue=(date)=> {
        if (this.state.modalFilterRevenueTypeInitial == 0) {
            var getDate = new Date(date);
            fetch(host + ':' + port + orderListUrl, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                }
            })
                .then(response => response.json())
                .then(dataJson => {
                    setTimeout(
                        () => {

                            var getLabelChart = [];
                            var getDataofDataSet = [];
                            var getOrder = [];
                            var getRevenue = 0;
                            var getExpense = 0;
                            var getExpenseDrink = 0;
                            var getExpenseDish = 0;
                            var getResource = [];

                            for (const element of dataJson) {
                                var getDateofOrder = new Date(element.time);
                                if ((getDateofOrder.getUTCDate() == getDate.getUTCDate()) && (getDateofOrder.getMonth() == getDate.getMonth()) && (getDateofOrder.getFullYear() == getDate.getFullYear())) {
                                    for (const element_f of element.dishs) {
                                        getRevenue = getRevenue + Number(element_f.dish.price) * Number(element_f.quantity);
                                        var getExpenseDishTotalResource = 0;
                                        for (const element_s of element_f.dish.resources) {
                                            var maxResource = 0;
                                            for (const element_t of element_s.resource.shipments) {
                                                if (element_s.id.resource_id == element_t.id.resource_id && maxResource < element_t.price) { maxResource = element_t.price; }
                                            }

                                            getExpenseDishTotalResource = getExpenseDishTotalResource + Number(element_s.quantity) * Number(maxResource);
                                        }
                                        getExpense = getExpense + getExpenseDishTotalResource;
                                    }
                                    for (const element_f of element.drinks) {
                                        getRevenue = getRevenue + Number(element_f.drink.price) * Number(element_f.quantity);

                                        var getShipmentDrink = element_f.drink.shipments;
                                        getShipmentDrink.sort(function (a, b) {
                                            a = new Date(a.price);
                                            b = new Date(b.price);
                                            return a > b ? -1 : a < b ? 1 : 0;
                                        });
                                        if (getShipmentDrink.length > 0) {
                                            getExpenseDrink = Number(element_f.quantity) * Number(getShipmentDrink[0].price);
                                        }
                                        else {
                                            getExpenseDrink = 0;
                                        }
                                        getExpense = getExpense + getExpenseDrink;
                                        //console.log();

                                    }

                                }


                            }


                            // for (var i = 1; i <= getDate.getUTCDate(); i++) {
                            //     getLabelChart.push('Ngày ' + i);
                            //     getDataofDataSet.push(i * 1000);

                            //    }
                            this.setState({
                                //     dataValueChart: {
                                //       labels: getLabelChart, datasets: [{
                                //         data: getDataofDataSet
                                //    }]
                                //}, 
                                outputRevenue: getRevenue, outputExpense: getExpense, outputProfit: getRevenue - getExpense
                            });
                        },
                        10
                    )

                })
                .catch(error => {
                    console.log(error);
                });

        }


        if (this.state.modalFilterRevenueTypeInitial == 1) {
            var getDate = new Date(date);
            fetch(host + ':' + port + orderListUrl, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                }
            })
                .then(response => response.json())
                .then(dataJson => {
                    setTimeout(
                        () => {

                            var getLabelChart = [];
                            var getDataofDataSet = [];
                            var getOrder = [];
                            var getRevenue = 0;
                            var getExpense = 0;
                            var getExpenseDrink = 0;
                            var getExpenseDish = 0;
                            var getResource = [];

                            for (const element of dataJson) {
                                var getDateofOrder = new Date(element.time);
                                if ((getDateofOrder.getMonth() == getDate.getMonth()) && (getDateofOrder.getFullYear() == getDate.getFullYear())) {
                                    for (const element_f of element.dishs) {
                                        getRevenue = getRevenue + Number(element_f.dish.price) * Number(element_f.quantity);
                                        var getExpenseDishTotalResource = 0;
                                        for (const element_s of element_f.dish.resources) {
                                            var maxResource = 0;
                                            for (const element_t of element_s.resource.shipments) {
                                                if (element_s.id.resource_id == element_t.id.resource_id && maxResource < element_t.price) { maxResource = element_t.price; }
                                            }

                                            getExpenseDishTotalResource = getExpenseDishTotalResource + Number(element_s.quantity) * Number(maxResource);
                                        }
                                        getExpense = getExpense + getExpenseDishTotalResource;
                                    }
                                    for (const element_f of element.drinks) {
                                        getRevenue = getRevenue + Number(element_f.drink.price) * Number(element_f.quantity);

                                        var getShipmentDrink = element_f.drink.shipments;
                                        getShipmentDrink.sort(function (a, b) {
                                            a = new Date(a.price);
                                            b = new Date(b.price);
                                            return a > b ? -1 : a < b ? 1 : 0;
                                        });
                                        if (getShipmentDrink.length > 0) {
                                            getExpenseDrink = Number(element_f.quantity) * Number(getShipmentDrink[0].price);
                                        }
                                        else {
                                            getExpenseDrink = 0;
                                        }
                                        getExpense = getExpense + getExpenseDrink;
                                        //console.log();

                                    }

                                }


                            }


                            // for (var i = 1; i <= getDate.getUTCDate(); i++) {
                            //     getLabelChart.push('Ngày ' + i);
                            //     getDataofDataSet.push(i * 1000);

                            //    }
                            this.setState({
                                //     dataValueChart: {
                                //       labels: getLabelChart, datasets: [{
                                //         data: getDataofDataSet
                                //    }]
                                //}, 
                                outputRevenue: getRevenue, outputExpense: getExpense, outputProfit: getRevenue - getExpense
                            });
                        },
                        10
                    )

                })
                .catch(error => {
                    console.log(error);
                });

        }

        if (this.state.modalFilterRevenueTypeInitial == 2) {
            var getDate = new Date(date);
            fetch(host + ':' + port + orderListUrl, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                }
            })
                .then(response => response.json())
                .then(dataJson => {
                    setTimeout(
                        () => {

                            var getLabelChart = [];
                            var getDataofDataSet = [];
                            var getOrder = [];
                            var getRevenue = 0;
                            var getExpense = 0;
                            var getExpenseDrink = 0;
                            var getExpenseDish = 0;
                            var getResource = [];

                            for (const element of dataJson) {
                                var getDateofOrder = new Date(element.time);
                                if ((getDateofOrder.getFullYear() == getDate.getFullYear())) {
                                    for (const element_f of element.dishs) {
                                        getRevenue = getRevenue + Number(element_f.dish.price) * Number(element_f.quantity);
                                        var getExpenseDishTotalResource = 0;
                                        for (const element_s of element_f.dish.resources) {
                                            var maxResource = 0;
                                            for (const element_t of element_s.resource.shipments) {
                                                if (element_s.id.resource_id == element_t.id.resource_id && maxResource < element_t.price) { maxResource = element_t.price; }
                                            }

                                            getExpenseDishTotalResource = getExpenseDishTotalResource + Number(element_s.quantity) * Number(maxResource);
                                        }
                                        getExpense = getExpense + getExpenseDishTotalResource;
                                    }
                                    for (const element_f of element.drinks) {
                                        getRevenue = getRevenue + Number(element_f.drink.price) * Number(element_f.quantity);

                                        var getShipmentDrink = element_f.drink.shipments;
                                        getShipmentDrink.sort(function (a, b) {
                                            a = new Date(a.price);
                                            b = new Date(b.price);
                                            return a > b ? -1 : a < b ? 1 : 0;
                                        });
                                        if (getShipmentDrink.length > 0) {
                                            getExpenseDrink = Number(element_f.quantity) * Number(getShipmentDrink[0].price);
                                        }
                                        else {
                                            getExpenseDrink = 0;
                                        }
                                        getExpense = getExpense + getExpenseDrink;
                                        //console.log();

                                    }

                                }


                            }


                            // for (var i = 1; i <= getDate.getUTCDate(); i++) {
                            //     getLabelChart.push('Ngày ' + i);
                            //     getDataofDataSet.push(i * 1000);

                            //    }
                            this.setState({
                                //     dataValueChart: {
                                //       labels: getLabelChart, datasets: [{
                                //         data: getDataofDataSet
                                //    }]
                                //}, 
                                outputRevenue: getRevenue, outputExpense: getExpense, outputProfit: getRevenue - getExpense
                            });
                        },
                        10
                    )

                })
                .catch(error => {
                    console.log(error);
                });

        }
    }
    render() {
        return (
            <View style={StatisticRevenueStyle.container}>

                <SafeAreaProvider>
                    <Text></Text>
                    <View style={StatisticRevenueStyle.setupItemCenterContainerRow}>

                        <TouchableOpacity
                            onPress={() => { this.setState({ modalFilterRevenueType: true }); }}

                        >
                            <Icon
                                style={{ marginRight: '1%' }}
                                name='caret-down-outline'
                                type='ionicon'
                                color='white'
                            />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 23 }}>Thống kê theo {this.state.outputRevenueType}</Text>
                    </View>
                    <Text></Text>
                    <View style={StatisticRevenueStyle.setupItemCenterContainerRow}>

                        <TouchableOpacity onPress={() => { this.setState({ flagDate: true }) }}>
                            <Icon
                                name='event'
                                type='material'
                                color='white'
                            />
                        </TouchableOpacity>

                        {this.state.flagDate ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                locale="ja"
                                format="DD/MM/YYYY HH:mm:ss"
                                value={new Date(Date.now())}
                                is24Hour={true}
                                onChange={this.onChangeDate}
                            /> : <View></View>}
                        <Text>  </Text>
                        <Text style={{ color: 'white', fontSize: this.state.windowWidth / 25 }}>{this.state.outputDate}</Text>
                    </View>
                    <Text></Text>
                    {this.state.flag ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>
                        :
                        <View>
                            <View style={StatisticRevenueStyle.topcontainer}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Doanh thu: {this.formatMoneyDatabasetoView(this.state.outputRevenue)}</Text>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Chi phí: {this.formatMoneyDatabasetoView(this.state.outputExpense)}</Text>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Lợi nhuận: {this.formatMoneyDatabasetoView(this.state.outputProfit)}</Text>

                            </View>

                            <View style={StatisticRevenueStyle.bottomcontainer}>

                                <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: '1%' }}>Biểu đồ lợi nhuận:</Text>

                                <ScrollView
                                    horizontal={true}
                                    style={{ borderWidth: 0.5, borderColor: 'white', marginBottom: '65%' }}
                                >

                                    <LineChart
                                        yAxisLabel="đ"
                                        yAxisInterval={10}
                                        style={{}}
                                        data={this.state.dataValueChart}
                                        width={this.state.windowWidth * 4}
                                        height={this.state.windowHeight / 2.7}
                                        verticalLabelRotation={30}
                                        chartConfig={this.state.chartConfig}
                                        bezier
                                    />
                                </ScrollView>

                            </View>
                        </View>
                    }
                    <View style={{ height: '1%' }}>{this.modalFilterRevenueTypeView(this.state.modalFilterRevenueType)}</View>

                </SafeAreaProvider>

            </View>
        );
    }
}
const mapStateToProps = state => {
    return { user: state.users }
};

export default connect(mapStateToProps)(StatisticRevenueScreen);