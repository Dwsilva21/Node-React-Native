import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';


import logoImg from '../../../assets/logo.png';
import api from '../../services/api';
import styles from "./styles";


export default function Incidents() {
    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([]);



    function navigateToDetail(){
        navigation.navigate('Detail');
    }

    async function loadIncidents(){
        const response = await api.get('incs2');
        setIncidents(response.data); 

   }

    useEffect( ()=>{
         
        loadIncidents();
    }, []);


    return (
 
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> 0 casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo !</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve os dia</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={ incident => incidents.id } 
                showsVerticalScrollIndicator={false} 
                renderItem={ ( {item: incident})=> (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{ incident.title }</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{ incident.description }</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>{ incident.value }</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={navigateToDetail}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>

                </View>
                )}
             />   
            
        </View>
    );

}