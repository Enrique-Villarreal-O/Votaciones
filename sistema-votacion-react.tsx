import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Candidato = ({ nombre, votos, onVote }) => (
  <Card className="m-2">
    <CardHeader className="font-bold">{nombre}</CardHeader>
    <CardContent>
      <Button onClick={onVote}>Votar</Button>
    </CardContent>
  </Card>
);

const TotalVotos = ({ total }) => (
  <Card className="m-2">
    <CardHeader>Total Votos</CardHeader>
    <CardContent>{total}</CardContent>
  </Card>
);

const VotosIndividuales = ({ votos, mostrarPorcentaje, candidatosVisibles }) => (
  <Card className="m-2">
    <CardHeader>Votos Individuales</CardHeader>
    <CardContent>
      {Object.entries(votos).map(([candidato, cantidad]) => {
        if (!candidatosVisibles[candidato]) return null;
        const porcentaje = (cantidad / Object.values(votos).reduce((a, b) => a + b, 0)) * 100;
        return (
          <div key={candidato}>
            {candidato}: {mostrarPorcentaje ? `${porcentaje.toFixed(2)}%` : cantidad}
          </div>
        );
      })}
    </CardContent>
  </Card>
);

const Filtro = ({ setMostrarPorcentaje, candidatosVisibles, setCandidatosVisibles }) => (
  <Card className="m-2">
    <CardHeader>Filtro</CardHeader>
    <CardContent>
      <RadioGroup defaultValue="numero" onValueChange={(value) => setMostrarPorcentaje(value === 'porcentaje')}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="numero" id="numero" />
          <Label htmlFor="numero">Número</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="porcentaje" id="porcentaje" />
          <Label htmlFor="porcentaje">Porcentaje</Label>
        </div>
      </RadioGroup>
      {Object.keys(candidatosVisibles).map((candidato) => (
        <div key={candidato} className="flex items-center space-x-2">
          <Checkbox
            id={candidato}
            checked={candidatosVisibles[candidato]}
            onCheckedChange={(checked) =>
              setCandidatosVisibles((prev) => ({ ...prev, [candidato]: checked }))
            }
          />
          <label htmlFor={candidato}>{candidato}</label>
        </div>
      ))}
    </CardContent>
  </Card>
);

const SistemaVotacion = () => {
  const [votos, setVotos] = useState({ C1: 0, C2: 0, C3: 0, C4: 0 });
  const [mostrarPorcentaje, setMostrarPorcentaje] = useState(false);
  const [candidatosVisibles, setCandidatosVisibles] = useState({
    C1: true,
    C2: true,
    C3: true,
    C4: true,
  });

  const handleVote = (candidato) => {
    setVotos((prev) => ({ ...prev, [candidato]: prev[candidato] + 1 }));
  };

  const totalVotos = Object.values(votos).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(votos).map((candidato) => (
          <Candidato
            key={candidato}
            nombre={candidato}
            votos={votos[candidato]}
            onVote={() => handleVote(candidato)}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <TotalVotos total={totalVotos} />
        <VotosIndividuales
          votos={votos}
          mostrarPorcentaje={mostrarPorcentaje}
          candidatosVisibles={candidatosVisibles}
        />
        <Filtro
          setMostrarPorcentaje={setMostrarPorcentaje}
          candidatosVisibles={candidatosVisibles}
          setCandidatosVisibles={setCandidatosVisibles}
        />
      </div>
    </div>
  );
};

export default SistemaVotacion;
